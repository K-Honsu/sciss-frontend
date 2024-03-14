import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/home/index.jsx';
import Login from './pages/auth/login/index.jsx';
import Signup from './pages/auth/signup/index.jsx';
import Dashboard from './pages/dashboard/index.jsx';
import Analytics from './components/modals/analytics/index.jsx';
// Router


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/app",
        element: <Dashboard />
      },
      {
        path: "/analytics",
        element: <Analytics />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
