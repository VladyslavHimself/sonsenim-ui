import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import {AuthProvider} from "./security/AuthProvider.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./security/ProtectedRoute.tsx";
import './index.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RootResolver} from "@/RootResolver.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootResolver />
    },

    {
      path: '/signIn',
      element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <RouterProvider router={router} />
              <Toaster />
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
