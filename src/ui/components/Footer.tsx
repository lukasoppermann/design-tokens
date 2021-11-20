import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  padding: 8px 0;
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  border-top: 1px solid var(--black1);
  & > * {
  align-self: center;
  }
  button {
    margin-right: 4px;
  }
  :last-child{
    margin-right: 0;
  }
  & [data-align="start"] {
    margin-right: auto;
  }
`

type FooterProps = {
  children: any
}

export const Footer = ({ children }: FooterProps) => {
  return (
    <footer className={style}>
      {children}
    </footer>
  )
}
