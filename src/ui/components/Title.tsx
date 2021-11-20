import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  font-size: var(--font-size-xsmall);
  font-weight: var(--font-weight-bold);
  letter-spacing: var( --font-letter-spacing-pos-xsmall);
  line-height: var(--line-height);
  color: var(--black8);
  height: var(--size-medium);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: default;
  user-select: none;
  padding: 0 calc(var(--size-xxsmall) / 2) 0 var(--size-xxsmall);
    /* sizes */
  &.title--small {
      font-size: var(--font-size-small);
      letter-spacing: var(--font-letter-spacing-pos-small);
  }
  &.title--large {
      font-size: var(--font-size-large);
      line-height: var(--font-line-height-large);
      letter-spacing: var(--font-letter-spacing-pos-large);
  }
  &.title--xlarge {
      font-size: var(--font-size-xlarge);
      line-height: var(--font-line-height-large);
      letter-spacing: var(--font-letter-spacing-pos-xlarge);
  }
  &.title--medium {
      font-weight: var(--font-weight-medium);
  }
  &.title--bold {
      font-weight: var(--font-weight-bold);
  }
`

type props = {
  children: any;
  className?: string;
  size?: 'small' | 'large' | 'xlarge';
  weight?: 'medium' | 'bold';
}

export const Title = ({
  children,
  className,
  size,
  weight
}: props) => {
  return (
    <h1 className={`${style} title ${size && `title--${size}`} ${weight && `title--${weight}`} ${className || ''}`}>{children}</h1>
  )
}
