import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'


// const router = createBrowserRouter(
//   createRoutesFromElements(
    
      
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
