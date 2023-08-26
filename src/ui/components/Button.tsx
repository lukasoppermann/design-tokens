import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
 display: flex;
    align-items: center;
    border-radius: var(--border-radius-large);
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
      color: var(--figma-color-text-onbrand);
      background-color: var(--figma-color-bg-brand);

      &:enabled:active, &:enabled:focus {
          border: 2px solid var(--figma-color-border-brand);
      }
      &:disabled {
          border: 1px solid var(--figma-color-border);
      }
    }

    // secondary 
    &.button--secondary {
      background-color: var(--figma-color-bg);
      border: 1px solid var(--figma-color-border-strong);
      color: var(--figma-color-text);
      padding: 0 calc(var(--size-xsmall) + 1px) 0 calc(var(--size-xsmall) + 1px);
      letter-spacing: var(--font-letter-spacing-pos-small);

      &:enabled:active, &:enabled:focus {
          border: 2px solid var(--figma-color-border-brand);
          padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
      }
      &:disabled {
          border: 1px solid var(--figma-color-border);
          color: var(--figma-color-text-secondary);
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
  name?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  className,
  isSecondary,
  isDisabled,
  onClick,
  type,
  autofocus,
  name
}: buttonProps) => {
  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      className={`${style} button--${isSecondary ? 'secondary' : 'primary'} ${className || ''}`}
      disabled={isDisabled}
      name={name}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}
