import React from 'react'
import styles from './logo.module.scss'

function Logo() {
  return (
    <div className={styles.container}>
      <span className={styles.logoLetters}>WORDB</span>
      <div className={styles.cube}>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
      </div>
      <span className={styles.logoLetters}>X</span>
    </div>
  )
}

export default Logo
