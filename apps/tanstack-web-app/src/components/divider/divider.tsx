import styles from './divider.module.css'
import type { CSSProperties } from 'react'

type Props = {
  spaceVertical?: CSSProperties['margin']
}

export const Divider = ({ spaceVertical }: Props) => {
  return (
    <div
      className={styles.root}
      style={{ marginTop: spaceVertical, marginBottom: spaceVertical }}
    />
  )
}
