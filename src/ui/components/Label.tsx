import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-small);
  letter-spacing: var(--font-letter-spacing-pos-small);
  line-height: var(--line-height);
  color: var(--figma-color-text-secondary);
  height: var(--size-medium);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: default;
  user-select: none;
  padding: 0 var(--size-xxxsmall) 0 var(--size-xxsmall);
`

type props = {
  children: any;
  className?: string;
}

export const Label = ({
  children,
  className
}: props) => {
  return (
    <div className={`${style} label ${className || ''}`}>
      {children}
    </div>
  )
}
