import React, { useState } from 'react'  
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Video from './Pages/Video/Video'

const App = () => {
  const [sidebar,setSidebar] = useState(false);
  return (
    <div>
      <BrowserRouter>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
<Route path='/' element={<Home sidebar={sidebar}/>}/>
<Route path='/video/:categoryId/:videoId' element={<Video/>}/>

      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App