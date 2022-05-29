import React from 'react'
import styles from './loading.module.scss'
function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.cube}>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
        <div className={styles.cube__face}></div>
      </div>
    </div>
  )
}

export default Loading
