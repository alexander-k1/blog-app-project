import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './navbar.module.scss'
function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className={styles.appNav}>
      <Logo />
      <div className={styles.navLinks}>
        <Link to='/'>home</Link>
        {children}
      </div>
    </nav>
  )
}

export default Navbar
