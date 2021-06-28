import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  display: flex;
  & > * {
    flex-grow: 1;
  }
`

type RowProps = {
  children: any,
  fill?: boolean
}

export const Row = ({ children, fill }: RowProps) => {
  return (
    <div className={`${style} ${fill ? 'fill' : ''}`}>{children}</div>
  )
}
