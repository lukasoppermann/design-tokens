import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  display: flex;
  &.fill > * {
    flex-grow: 1;
  }
  &.fill > .flex-grow--none {
    flex-grow: 0;
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
