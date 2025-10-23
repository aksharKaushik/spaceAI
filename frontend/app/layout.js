'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Employee Directory</title>
        <meta name="description" content="A modern employee directory application" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <ApolloProvider client={client}>
          <div className="min-h-screen">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Employee Directory
                  </h1>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}
