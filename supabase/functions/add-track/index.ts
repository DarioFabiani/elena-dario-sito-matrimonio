import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SPOTIFY_CLIENT_ID = Deno.env.get("SPOTIFY_CLIENT_ID")!;
const SPOTIFY_CLIENT_SECRET = Deno.env.get("SPOTIFY_CLIENT_SECRET")!;
const SPOTIFY_REFRESH_TOKEN = Deno.env.get("SPOTIFY_REFRESH_TOKEN")!;
const SPOTIFY_PLAYLIST_ID = Deno.env.get("SPOTIFY_PLAYLIST_ID")!;

let cachedUserToken: string | null = null;
let userTokenExpiry: number = 0;

async function getUserAccessToken(): Promise<string> {
  if (cachedUserToken && Date.now() < userTokenExpiry) {
    return cachedUserToken;
  }

  const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
  
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}`,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Token refresh error:", errorData);
    throw new Error("Failed to refresh Spotify access token");
  }

  const data = await response.json();
  cachedUserToken = data.access_token;
  userTokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  
  return cachedUserToken!;
}

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const { trackUri } = await req.json();

    if (!trackUri) {
      return new Response(JSON.stringify({ error: "Track URI is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const token = await getUserAccessToken();
    
    // Add track to playlist
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Add track error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to add track", details: errorData }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({ success: true, snapshot_id: data.snapshot_id }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
