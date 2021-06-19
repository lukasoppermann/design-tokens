import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  margin-top: 8px;
  height: 1px;
  border: 0px;
  width: 100%;
  background: var(--light-grey);
`

export const Separator = () => {
  return (
    <hr className={style} />
  )
}
