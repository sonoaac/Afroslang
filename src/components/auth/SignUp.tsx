import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface SignUpProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      if (error || !user) throw error ?? new Error('Signup failed');
      await supabase.from('profiles').insert({
        id: user.id, username, email, hearts: 5, xp: 0,
        sandbits: 0, diamonds: 0, subscription_active: false,
        subscription_plan: null, created_at: new Date().toISOString(),
      });
      onSuccess();
    } catch (error: any) {
      
      // Provide more specific error messages
      if (error.code === 'auth/configuration-not-found') {
        setError('Firebase configuration not found. Please check your Firebase project settings.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try logging in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(error.message || 'An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Join Afroslang
          </h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            Start your African language learning journey
          </p>
        </div>
        
        <form className="mt-6 space-y-4" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Create a password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-500 text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
    </div>
  );
};
