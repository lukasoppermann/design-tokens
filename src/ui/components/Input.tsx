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
      color: var(--black8);
      border: 1px solid transparent;
      border-radius: var(--border-radius-small);
      outline: none;
      background-color: var(--white);

      &:hover, &:placeholder-shown:hover {
          color: var(--black8);
          border: 1px solid var(--black1);
          background-image: none;
      }
      &::placeholder {
          color: var(--black6);
          border: 1px solid transparent;
      }
      &:placeholder-shown {
          border: 1px solid var(--black1);
      }
      &:focus:placeholder-shown {
          border: 1px solid var(--blue);
          outline: 1px solid var(--blue);
          outline-offset: -2px;
      }
      &:disabled:hover {
          border: 1px solid transparent;
      }
      &:active, &:focus {
          color: var(--black);
          border: 1px solid var(--blue);
          outline: 1px solid var(--blue);
          outline-offset: -2px;
      }
      &:disabled {
          position: relative;
          color: var(--black6);
          user-select: none;
      }
      &:disabled:active {
          outline: none;
      }
      &:invalid {
        border: 1px solid var(--red);
        outline: 1px solid var(--red);
        outline-offset: -2px;
      }
  }

  .input--borders {
    border: 1px solid var(--black1);
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
