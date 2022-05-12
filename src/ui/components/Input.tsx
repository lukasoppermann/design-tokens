import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
  position: relative;
  .input__field {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-normal);
      letter-spacing: var( --font-letter-spacing-neg-xsmall);
      line-height: var(--line-height);
      position: relative;
      display: flex;
      overflow: visible;
      align-items: center;
      width: 100%;
      height: 30px;
      margin: 1px 0 1px 0;
      padding: var(--size-xxsmall) var(--size-xxxsmall) var(--size-xxsmall) var(--size-xxsmall);
      border: 1px solid transparent;
      border-radius: var(--border-radius-small);
      outline: none;
      background-color: transparent;
      color: var(--figma-color-text);

      &:hover, &:placeholder-shown:hover {
          color: var(--figma-color-text);
          border: 1px solid var(--figma-color-border);
          background-image: none;
      }
      &::placeholder {
          color: var(--figma-color-text-secondary);
          border: 1px solid transparent;
      }
      &:placeholder-shown {
          border: 1px solid var(--figma-color-border);
      }
      &:focus:placeholder-shown {
          border: 1px solid var(--figma-color-border-brand);
          outline: 1px solid var(--figma-color-border-brand);
          outline-offset: -2px;
      }
      &:disabled:hover {
          border: 1px solid transparent;
      }
      &:active, &:focus {
          color: var(--figma-color-text);
          border: 1px solid var(--figma-color-border-brand);
          outline: 1px solid var(--figma-color-border-brand);
          outline-offset: -2px;
      }
      &:disabled {
          position: relative;
          color: var(--figma-color-border-danger);
          user-select: none;
      }
      &:disabled:active {
          outline: none;
      }
      &:invalid {
        border: 1px solid var(--figma-color-border-danger);
        outline: 1px solid var(--figma-color-border-danger);
        outline-offset: -2px;
      }
  }

  .input--borders {
    border: 1px solid var(--figma-color-border-secondary);
  }
`

type props = {
  type: 'text' | 'password' | 'number';
  className?: string;
  placeholder: string;
  defaultValue?: any;
  value?: any;
  isDisabled?: boolean;
  required?: boolean;
  pattern?: string;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Input = ({
  className = '',
  defaultValue,
  type,
  value,
  placeholder,
  isDisabled,
  onChange,
  required,
  pattern
}: props) => {
  return (
    <div className={`${style} input ${className || ''}`}>
      <input
        type={type}
        className={`input__field  ${className || ''}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={isDisabled}
        required={required}
        pattern={pattern}
        onChange={(event) => onChange && onChange(event.target.value, event)}
      />
    </div>
  )
}
