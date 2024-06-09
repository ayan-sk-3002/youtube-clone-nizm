import React from 'react'
import '../Navbar/Navbar.css'
import logo from '../../Components/assets/logo.png'
import search_icon from '../../Components/assets/search.png'
import menu_icon from '../../Components/assets/menu.png'
import upload_icon from '../../Components/assets/upload.png'
import more_icon from '../../Components/assets/more.png'
import notification_icon from '../../Components/assets/notification.png'
import profile_icon from '../../Components/assets/user_profile.jpg'
import { Link } from 'react-router-dom'
const Navbar = ({setSidebar}) => {
  return (
    <div className='navbar flex-box'>
      <div className="nav-left flex-box"> 
      <img src={menu_icon} onClick={()=>{setSidebar(prev=>prev===false?true:false)}} className='menu' />
      <Link to={"/"} className='logo'><p>NizmTube</p></Link>
      </div>
      <div className="flex-box search-box">
        <input type="text" placeholder='Search'/>
      <img src={search_icon} />
      </div>
      <div className="nav-right flex-box">
      <img className='menu-item' src={upload_icon} />
      <img className='menu-item' src={more_icon} />
      <img className='menu-item' src={notification_icon} />
      <img src={profile_icon} className='user-icon'/>
      </div>
    </div>
  )
}

export default Navbar