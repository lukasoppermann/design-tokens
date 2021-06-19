import { css } from '@emotion/css'
import * as React from 'react'

type InfoProps = {
  label: string,
  width: number
}

const style = css`
  position: relative;
  cursor: help;
  .tooltip {
    pointer-events: none;
    background: var(--ui-contrast);
    font-size: var(--font-size-xsmall);
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
  &:hover .tooltip {
    transform: translate(-50%, -96%);
    opacity: .85;
  }
`

export const Info = ({ label, width }: InfoProps) => {
  return (
    <div className={style}>
      <div className='tooltip' style={{ width: `${width}px` }}>{label}</div>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path fill-rule='evenodd' clip-rule='evenodd' d='M24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16ZM15.2881 13.6082V19.948H16.7119V13.6082H15.2881ZM15.4053 11.4167C15.2686 11.5613 15.2002 11.7429 15.2002 11.9617C15.2002 12.1765 15.2686 12.3562 15.4053 12.5007C15.5459 12.6414 15.7451 12.7117 16.0029 12.7117C16.2607 12.7117 16.46 12.6414 16.6006 12.5007C16.7412 12.3562 16.8115 12.1765 16.8115 11.9617C16.8115 11.7429 16.7412 11.5613 16.6006 11.4167C16.46 11.2722 16.2607 11.2 16.0029 11.2C15.7451 11.2 15.5459 11.2722 15.4053 11.4167Z' fill='black' />
      </svg>
    </div>
  )
}
