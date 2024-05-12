import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider.jsx';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)



















// highest conti--->Winner
//leaderboard --->point
//contributr--->Upload