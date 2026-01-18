#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
const envPath = path.resolve('.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: .env.local not found. Please create it with your Supabase credentials.');
  process.exit(1);
}

const envConfig = dotenv.parse(fs.readFileSync(envPath));
const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseAnonKey = envConfig.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getImageUrls() {
  try {
    console.log('🔍 Fetching images from bucket: wedding-photos\n');

    // List all files in the bucket
    const { data, error } = await supabase.storage
      .from('wedding-photos')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('❌ Error listing files:', error);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.warn('⚠️  No images found in the wedding-photos bucket.');
      process.exit(0);
    }

    // Filter only image files
    const imageFiles = data.filter(file => {
      const ext = path.extname(file.name).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    if (imageFiles.length === 0) {
      console.warn('⚠️  No image files found in the bucket.');
      process.exit(0);
    }

    console.log(`✅ Found ${imageFiles.length} image(s)\n`);

    // Build public URLs
    const imageUrls = imageFiles.map(file => {
      const publicUrl = supabase.storage
        .from('wedding-photos')
        .getPublicUrl(file.name).data.publicUrl;

      return {
        name: file.name,
        url: publicUrl
      };
    });

    // Display in console
    console.log('📸 Image URLs:\n');
    imageUrls.forEach((img, index) => {
      console.log(`${index + 1}. ${img.name}`);
      console.log(`   ${img.url}\n`);
    });

    // Save to file
    const outputFile = 'image-urls.json';
    fs.writeFileSync(outputFile, JSON.stringify(imageUrls, null, 2));
    console.log(`✅ URLs saved to ${outputFile}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

getImageUrls();
