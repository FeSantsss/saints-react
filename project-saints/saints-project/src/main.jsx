import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './saints-ui/foundation/tokens.css'
import './saints-ui/foundation/base.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import About from './routes/About.jsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router}/>
  </StrictMode>,
)
