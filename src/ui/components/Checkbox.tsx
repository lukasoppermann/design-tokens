import { css } from '@emotion/css'
import * as React from 'react'

const style = css`
&.checkbox {
  align-items: center;
  cursor: default;
  display: flex;
  height: var(--size-medium);
  position: relative;

  &.checkbox__box {
    opacity: 0;
    width: 10px;
    height: 10px;
    margin: 0;
    padding: 0;
  }

  &.checkbox__label {
    align-items: center;
    display: flex;
    font-family: var(--font-stack);
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    line-height: var(--font-line-height);
    letter-spacing: var(--font-letter-spacing-pos-xsmall);
    margin-left: -16px;
    padding: 0 var(--size-xsmall) 0 var(--size-small);
    height: 100%;
    user-select: none;
    color: var(--figma-color-text);
  }

  &.checkbox__label:before {
    border: 1px solid var(--figma-color-border-strong);
    border-radius: var(--border-radius-small);
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin: -1px 10px 0 -8px;
    box-shadow: none;
  }

  &.checkbox__box:disabled + &.checkbox__label {
    color: var(--figma-color-text);
    opacity: 0.3;
  }

  /* checked */
  &.checkbox__box:checked + &.checkbox__label:before {
    background-color: var(--figma-color-bg-brand);
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20fill%3D%22none%22%20height%3D%227%22%20viewBox%3D%220%200%208%207%22%20width%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m1.17647%201.88236%201.88235%201.88236%203.76471-3.76472%201.17647%201.17648-4.94118%204.9412-3.05882-3.05884z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: 1px 2px;
    border: 1px solid var(--figma-color-border-brand);
  }
  &.checkbox__box:checked:disabled + &.checkbox__label:before {
    border: 1px solid transparent;
    background-color: var(--figma-color-bg-brand-tertiary);
  }
}
&.toggle {
  align-items: center;
  cursor: default;
  display: flex;
  height: var(--size-medium);
  position: relative;

  .switch__toggle {
      opacity: 0;
  }
  .switch__toggle:checked + .toggle__label:before {
      color: var(--figma-color-text);
      background-color: var(--figma-color-bg-brand);
  }
  .switch__toggle:checked + .toggle__label:after {
      transform: translateX(12px);
  }
  .switch__toggle:checked:disabled + .toggle__label:before {
      background-color: var(--figma-color-bg-brand);
  }
  .switch__toggle:disabled + .toggle__label {
      opacity: 0.3;
  }

  .toggle__label {
    align-items: center;
    display: flex;
    font-family: var(--font-stack);
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    height: 100%;
    letter-spacing: var(--font-letter-spacing-pos-xsmall);
    line-height: var(--font-line-height);
    margin-left: -16px;
    padding: 0 var(--size-xsmall) 0 calc(var(--size-xlarge) - 2px);
    user-select: none;
    color: var(--figma-color-text);

      &:before {
        background-color: var(--figma-color-icon-tertiary);
        border-radius: 6px;
        content: '';
        display: block;
        height: 12px;
        left: 8px;
        position: absolute;
        top: 10px;
        transition: background-color 0 0.2s;
        width: 24px;
      }
      &:after {
        background-color: var(--figma-color-icon-onbrand);
        border-radius: 50%;
        content: '';
        display: block;
        height: 10px;
        left: 9px;
        position: absolute;
        top: 11px;
        transition: transform 0.2s;
        width: 10px;
      }
  }
}
`

type props = {
  className?: string;
  id?: string;
  label: string;
  type?: 'checkbox' | 'switch';
  isDisabled?: boolean;
  defaultValue?: boolean;
  checked?: boolean;
  onChange?: (
    value: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Checkbox = ({
  id,
  className,
  type = 'checkbox',
  isDisabled,
  label,
  defaultValue,
  checked,
  onChange
}: props) => {
  let inputConfig: any = {
    id: id || `${type}--${(Math.random() * 100000000).toFixed(0)}`
  }
  if (defaultValue && checked) {
    console.warn(
      'Use either "defaultValue" to create an uncontrolled component or "checked" to create a controlled component'
    )
  }
  switch (type) {
    case 'switch':
      inputConfig = {
        ...inputConfig,
        className: 'switch__toggle',
        type: 'checkbox'
      }
      break
    default:
      inputConfig = {
        ...inputConfig,
        className: 'checkbox__box',
        type: 'checkbox'
      }
      break
  }

  if (type === 'switch') {
    // @ts-ignore
    type = 'toggle'
  }

  return (
    <div className={`${style} ${type || 'checkbox'} ${className || ''}`}>
      <input
        {...inputConfig}
        defaultChecked={defaultValue}
        checked={checked}
        onChange={(event) => onChange && onChange(event.target.checked, event)}
        disabled={isDisabled}
      />
      <label className={`${type}__label`} htmlFor={inputConfig.id}>
        {label}
      </label>
    </div>
  )
}
