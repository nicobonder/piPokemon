import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import s from './Navbar.module.css'
import logo from './pokeLogo.png'
import Search from './Search';

export default function Navbar() {
  return (
    <div className={s.navbarSection}>
      <Link className={s.logo} to='/'><img className={s.logo} src={logo} alt="logo Pokemon" /></Link>
      <nav className={s.links}>
          <NavLink className={s.link} to='/pokemons'><i className="fa-solid fa-bowling-ball"></i> All Pokemons</NavLink>
          <NavLink className={s.link} to='/create'><i className="fa-solid fa-plus"></i> Create your Pokemon</NavLink>
        </nav>
      <Search />
    </div>
    
  )
}

//navbar sin responsive
/*  
return (
  <div className={s.navbarSection}>
    <Link className={s.logo} to='/'><img className={s.logo} src={logo} alt="logo Pokemon" /></Link>
    <nav className={s.links}>
        <NavLink className={s.link} to='/pokemons'><i className="fa-solid fa-bowling-ball"></i> All Pokemons</NavLink>
        <NavLink className={s.link} to='/create'><i className="fa-solid fa-plus"></i> Create your Pokemon</NavLink>
      </nav>
    <Search />
  </div>
  
)*/
