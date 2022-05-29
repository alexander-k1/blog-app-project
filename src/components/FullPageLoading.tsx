import React from 'react'
import styles from './full-page-loading.module.scss'
import Loading from './Loading'

function FullPageLoading() {
  return (
    <div className={styles.wrapper}>
      <Loading />
    </div>
  )
}

export default FullPageLoading
