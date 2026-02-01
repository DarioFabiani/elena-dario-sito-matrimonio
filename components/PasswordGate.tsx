import { useState, useEffect } from 'react';

const SESSION_KEY = 'wedding_auth';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const authToken = sessionStorage.getItem(SESSION_KEY);
    if (authToken === import.meta.env.VITE_SITE_PASSWORD) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_SITE_PASSWORD;
    
    if (!correctPassword) {
      setError('Configurazione del sito incompleta. Contatta gli sposi.');
      return;
    }
    
    if (password === correctPassword) {
      sessionStorage.setItem(SESSION_KEY, password);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password non corretta. Riprova.');
      setPassword('');
    }
  };

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-secondary font-display text-2xl">
          Caricamento...
        </div>
      </div>
    );
  }

  // If authenticated, show the actual website
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show password gate
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Decorative top border */}
        <div className="mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>

        <div className="bg-paper rounded-3xl shadow-xl border border-primary/20 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-display text-secondary mb-4">
              Elena & Dario
            </h1>
            <div className="flex items-center justify-center gap-3 text-primary mb-6">
              <div className="h-px bg-primary/30 w-12"></div>
              <span className="material-icons text-3xl">favorite</span>
              <div className="h-px bg-primary/30 w-12"></div>
            </div>
            <p className="text-secondary/70 font-serif text-lg">
              Inserisci la password per accedere al sito
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-sans text-secondary/70 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans bg-background"
                autoComplete="off"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 font-sans flex items-center gap-1">
                  <span className="material-icons text-base">error</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-xl font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>Accedi</span>
              <span className="material-icons">arrow_forward</span>
            </button>
          </form>

          {/* Help text */}
          <div className="mt-8 pt-6 border-t border-primary/20">
            <p className="text-sm text-secondary/50 font-sans text-center">
              Se non hai ricevuto la password, contatta gli sposi
            </p>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="mt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
