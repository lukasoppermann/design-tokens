import { css } from '@emotion/css'
import * as React from 'react'

type InfoProps = {
  label: string,
  width: number
}

const style = css`
  position: relative;
  cursor: help;
  display: inline-block;
  svg path {
    fill: var(--figma-color-icon-secondary);
  }
  .tooltip {
    pointer-events: none;
    background: var(--ui-contrast);
    font-size: var(--font-size-xsmall);
    font-weight: normal;
    color: var(--on--ui-contrast);
    padding: 4px 6px;
    border-radius: 3px;
    opacity: 0;
    display: inline-block;
    position: absolute; 
    white-space: pre-line;
    top: 0;
    left: 50%;
    transform: translate(-50%, -90%);
    transition: opacity .35s ease, transform .25s ease;
    backdrop-filter: blur(5px);
    ::before {
      content: "";
      display: block;
      position: absolute;
      border: 4px solid transparent;
      border-top-color: var(--ui-contrast);
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover {
    svg path {
      fill: var(--figma-color-icon-hover);
    }
    .tooltip {
      transform: translate(-50%, -96%);
      opacity: .85;
    }
  }
  @media (prefers-color-scheme: dark) {
    .tooltip {
      color: var(--ui-contrast);
      background: var(--on--ui-contrast);
    }
  }
`

export const Info = ({ label, width }: InfoProps) => {
  return (
    <div className={style}>
      <div className='tooltip' style={{ width: `${width}px` }}>{label}</div>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M17.3,13.5A1.85,1.85,0,0,0,16,13.1a1.85,1.85,0,0,0-1.3.42,1.47,1.47,0,0,0-.48,1.17h1.13a.82.82,0,0,1,.09-.38l.09-.11a.52.52,0,0,1,.22-.14A.69.69,0,0,1,16,14q.6,0,.6.66a.81.81,0,0,1,0,.22.88.88,0,0,1-.09.2,2.52,2.52,0,0,1-.47.51,1.8,1.8,0,0,0-.48.64h0a2.3,2.3,0,0,0-.14.87h1v-.24a1.06,1.06,0,0,1,.34-.67l.32-.3a2.7,2.7,0,0,0,.52-.65A1.52,1.52,0,0,0,17.3,13.5Z' /><path d='M16.41,17.89a.62.62,0,0,0-.46-.17.57.57,0,0,0-.26,0,.63.63,0,0,0-.2.13.61.61,0,0,0,0,.85.6.6,0,0,0,.46.17.71.71,0,0,0,.32-.07.45.45,0,0,0,.14-.1.61.61,0,0,0,0-.85Z' />
        <path d='M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,11a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z' />
      </svg>
    </div>
  )
}
