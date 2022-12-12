import React from 'react'
import { NavLink, Link } from "react-router-dom";
import s from './Navbar.module.css'
import logo from './pokeLogo.png'
import Search from './Search';


export default function Navbar() {

  return (
    <div className={s.navbarSection}>
    <Link className={s.logo} to='/'><img className={s.logo} src={logo} alt="logo Pokemon" /></Link>
    <nav className={s.links}>
        <NavLink className={s.link} to='/pokemons'>All Pokemons</NavLink>
        <NavLink className={s.link} to='/create'>Create your Pokemon</NavLink>
      </nav>
    <Search />
    </div>
  )
}
