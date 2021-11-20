import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
 display: flex;
    align-items: center;
    border-radius: var(--border-radius-large);
    color: var(--white);
    flex-shrink: 0;
    font-family: var(--font-stack);
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--font-letter-spacing-neg-small);
    line-height: var(--font-line-height);
    height: var(--size-medium);
    padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
    text-decoration: none;
    outline: none;
    border: 2px solid transparent;
    user-select: none;

    // primary 
    &.button--primary {
      background-color: var(--blue);

      &:enabled:active, &:enabled:focus {
          border: 2px solid var(--black3);
      }
      &:disabled {
          background-color: var(--black3);
      }
    }

    // secondary 
    &.button--secondary {
      background-color: var(--white);
      border: 1px solid var(--black8);
      color: var(--black8);
      padding: 0 calc(var(--size-xsmall) + 1px) 0 calc(var(--size-xsmall) + 1px);
      letter-spacing: var(--font-letter-spacing-pos-small);

      &:enabled:active, &:enabled:focus {
          border: 2px solid var(--blue);
          padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
      }
      &:disabled {
          border: 1px solid var(--black3);
          color: var(--black6);
      }
    }
`

type buttonProps = {
  children: any;
  className?: string;
  autofocus?: boolean;
  isSecondary?: boolean;
  isDisabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  className,
  isSecondary,
  isDisabled,
  onClick,
  type,
  autofocus
}: buttonProps) => {
  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      className={`${style} button--${isSecondary ? 'secondary' : 'primary'} ${className || ''}`}
      disabled={isDisabled}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}
