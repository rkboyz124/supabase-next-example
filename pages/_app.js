import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

// eslint-disable-next-line react/function-component-definition
export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <main className="dark">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Header {...pageProps} />
        <Component {...pageProps} />
      </SessionContextProvider>
    </main>
  );
}
