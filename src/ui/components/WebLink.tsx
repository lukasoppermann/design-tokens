import { commands } from '@config/commands'
import { css } from '@emotion/css'
import * as React from 'react'

type WebLinkProps = {
  children: any,
  href: string
  align?: string
}

const style = css`
  display: inline-block;
  text-decoration: underline;
  font-size: var(--font-size-xsmall);
  font-weight: var(--font-weight-medium);
  padding: 3px 5px;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: var(--blue);
  }
`
const clickWebLink = (href) => {
  window.open(href)
  parent.postMessage({
    pluginMessage: {
      command: commands.closePlugin
    }
  }, '*')
}

export const WebLink = ({ children, href, align }: WebLinkProps) => {
  return <div data-align={align} className={style} onClick={() => clickWebLink(href)}>{children}</div>
}
