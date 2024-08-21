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
import NavSidebar from "@/pages/NavSidebar/NavSidebar.tsx";
import GroupsList from "@/pages/GroupsList.tsx";
import ModalBoxesContainer from "@/ModalBoxes/ModalBoxesContainer.tsx";
import SelectedGroupPage from "@/pages/SelectedGroupPage.tsx";
import CardListPage from "@/pages/CardListPage.tsx";
import MemoizationPage from "@/pages/MemoizationPage.tsx";

const router = createBrowserRouter([
    {
        element: <NavSidebar />,
        children: [
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
            },
            {
                path: '/groups',
                element: <ProtectedRoute><GroupsList /></ProtectedRoute>,
            },
            {
                path: '/groups/:groupId',
                element: <ProtectedRoute><SelectedGroupPage /></ProtectedRoute>
            },
            {
                path: '/groups/:groupId/card-list/:deckId',
                element: <ProtectedRoute><CardListPage /></ProtectedRoute>
            },
            {
                path: '/memoization',
                element: <ProtectedRoute><MemoizationPage /></ProtectedRoute>
            }
        ]
    }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <Toaster />
              <ModalBoxesContainer />
              <div className="app-container">
                  <RouterProvider router={router} />
              </div>
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
