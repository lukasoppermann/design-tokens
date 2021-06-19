import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  display: flex;
`

export const Row = ({ children }) => {
  return (
    <div className={style}>{children}</div>
  )
}
