import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  font-family: var(--font-stack);
  font-size: var(--font-size-xsmall);
  font-weight: var(--font-weight-normal);
  line-height: var(--font-line-height);
  letter-spacing: var(--font-letter-spacing-pos-xsmall);

  /* sizes */
  &.type--small {
      font-size: var(--font-size-small);
      letter-spacing: var(--font-letter-spacing-pos-small);
  }
  &.type--large {
      font-size: var(--font-size-large);
      line-height: var(--font-line-height-large);
      letter-spacing: var(--font-letter-spacing-pos-large);
  }
  &.type--xlarge {
      font-size: var(--font-size-xlarge);
      line-height: var(--font-line-height-large);
      letter-spacing: var(--font-letter-spacing-pos-xlarge);
  }
`

type props = {
  children: any;
  className?: string;
  size?: 'small' | 'large' | 'xlarge';
}

export const Text = ({
  children,
  className,
  size
}: props) => {
  return (
    <p className={`${style} type ${size && `type--${size}`} ${className || ''}`}>
      {children}
    </p>
  )
}
