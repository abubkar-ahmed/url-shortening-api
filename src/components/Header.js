import { useState } from "react"
import { useRef } from "react";
import React from 'react'

function Header() {

    const [navBar,setNavBar] = useState(true);
    const navRef = useRef(null);

    const hamClickHandler = () => {
        navRef.current.classList.toggle('active');
        setNavBar(prevNavBar => !prevNavBar);
    }
  return (
    <header>
        <div className="img-container col-1">
          <img src='./images/logo.svg' alt='logo'/>
        </div>
        <div className='ham '  onClick={hamClickHandler} ref={navRef}>
          <span className='span-1'></span>
          <span className='span-2'></span>
          <span className='span-3'></span>
        </div>
        <nav className={navBar ? 'hidden col-11' : 'nav'}>
            <ul>
                <li>Features</li>
                <li>Pricing</li>
                <li>Reasources</li>
            </ul>
            <div className='sign-container'>
                <button className='login'>Login</button>
                <button className='sign'>Sign Up</button>
            </div>
        </nav>
    </header>
  )
}

export default Header