import 'sanitize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CreatePoint from './CreatePoint'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreatePoint></CreatePoint>,
  },
  {
    path: '/create-point',
    element: <CreatePoint></CreatePoint>,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
