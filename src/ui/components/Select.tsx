import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const style = css`
select.select-menu {
  display: none;
}
&.select-menu {
  position: relative;

  // button
  .select-menu__button {
      display: flex;
      align-items: center;
      border: 1px solid transparent;
      height: 30px;
      width: 100%;
      margin: 1px 0 1px 0;
      padding: 0px var(--size-xxsmall) 0px var(--size-xxsmall);   
      overflow-y: hidden;
      border-radius: var(--border-radius-small);
      background-color: var(--figma-color-bg) !important;

      &:hover {
          border-color: var(--figma-color-border);
      }
      &:focus {
          border: 1px solid var(--figma-color-border-brand);
          outline: 1px solid var(--figma-color-border-brand);
          outline-offset: -2px;
      }
      &:disabled:hover {
          justify-content: flex-start;
          border-color: transparent;
      }
      * {
          pointer-events: none;
      }
  }
  .select-menu__button:hover .select-menu__label--placeholder {
      color: var(--figma-color-text);
  }
  .select-menu__button:focus .select-menu__label--placeholder {
      color: var(--figma-color-text);
  }
  .select-menu__button:disabled:hover .select-menu__label--placeholder {
      color: var(--figma-color-text-secondary);
  }
  .select-menu__button:hover .select-menu__caret, .select-menu__button:focus .select-menu__caret {
      opacity: 1.0;
      margin-left: auto;
      margin-right: -6px;
  }
  .select-menu__button:disabled:hover .select-menu__caret {
      opacity: 0.3;
      margin-left: -12px;
  }
  .select-menu__button:disabled .select-menu__label {
      color: var(--figma-color-text-secondary);
  }

  //label w/ placeholder modifier
  .select-menu__label {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-normal);
      letter-spacing: var( --font-letter-spacing-neg-xsmall);
      line-height: var(--line-height);
      color: var(--figma-color-text);
      margin-right: 6px;
      margin-top: -2px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;

      &--placeholder {
          color: var(--figma-color-text-secondary);
      }
  }

  //caret / chevron
  .select-menu__caret {
    width: 30px;
    height: 30px;
    display: block;
    margin-top: -2px;
    margin-left: -12px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      fill: var(--figma-color-icon-oncomponent-secondary);
    }
  }

  //icon - we will render the icon component but we override some additional styles
  .icon {
      margin-left: -8px;
      margin-top: -2px;
      margin-right: 0;
      opacity: 0.3;
  }


  //menu
  .select-menu__menu {
      display: none;
      position: absolute;
      top:0;
      left:0;
      width: 100%;

      background-color: var(--ui-contrast);
      box-shadow: var(--shadow-hud);
      padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
      border-radius: var(--border-radius-small);
      margin: 0;
      z-index: 1000;
      overflow-x: overlay;
      overflow-y: auto;

      &.select-menu__menu--active {
        display: block;
      }
  }
  .select-menu__menu::-webkit-scrollbar{
      width: 12px;
      background-color:transparent;
      /* background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=); */
      background-repeat:repeat;
      background-size:100% auto
  }
  .select-menu__menu::-webkit-scrollbar-track{
      border:solid 3px transparent;
      -webkit-box-shadow:inset 0 0 10px 10px transparent;
      box-shadow:inset 0 0 10px 10px transparent;
  }
  .select-menu__menu::-webkit-scrollbar-thumb{
      border:solid 3px transparent;
      border-radius:6px;
      -webkit-box-shadow:inset 0 0 10px 10px rgba(255,255,255,.4);
      box-shadow:inset 0 0 10px 10px rgba(255,255,255,.4);
  }

  //item
  .select-menu__item {
      align-items: center;
      color: var(--on--ui-contrast);
      cursor: default;
      display: flex;
      font-family: var(--font-stack);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-normal);
      letter-spacing: var(--font-letter-spacing-neg-xsmall);
      line-height: var(--font-line-height);
      height: var(--size-small);
      padding: 0px var(--size-xsmall) 0px var(--size-xxsmall);
      user-select: none;
      outline: none;
  }
  .select-menu__item--selected & {
      .select-menu__item-icon {
          opacity: 1.0;
      }
  }
  .select-menu__item-label {
      overflow-x: hidden;
      white-space: nowrap; 
      text-overflow: ellipsis;
      pointer-events: none;
  }
  .select-menu__item-icon {
      width: var(--size-xsmall);
      height: var(--size-xsmall);
      margin-right: var(--size-xxsmall);
      opacity: 0;
      pointer-events: none;
      /* background-image: url('data:image/svg+xml;utf8,%3Csvg%20fill%3D%22none%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20width%3D%2216%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m13.2069%205.20724-5.50002%205.49996-.70711.7072-.70711-.7072-3-2.99996%201.41422-1.41421%202.29289%202.29289%204.79293-4.79289z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E'); */
      /* background-repeat: no-repeat;
      background-position: center center; */
  }
  .select-menu--highlight, .select-menu__item:hover, .select-menu__item:focus {
      background-color: var(--figma-color-bg-brand);
  }

  //divider
  .select-menu__divider-label {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-normal);
      letter-spacing: var( --font-letter-spacing-neg-small);
      line-height: var(--line-height);
      display: flex;
      align-items: center;
      height: var(--size-small);
      padding: 0 var(--size-xxsmall) 0 var(--size-medium);
      color: var(--on--ui-contrast--subtle);
      margin-top: 0;
  }
  .select-menu__divider {
      background-color: var(--on--ui-contrast--subtle);
      display: block;
      height: 1px;
      margin: 8px 0 7px 0;
  }
}
`

interface SelectOption {
  divider?: string | boolean;
  value: string | number | boolean;
  label: string;
  title?: string;
}

type props = {
  className?: string;
  options: SelectOption[];
  placeholder: string;
  isDisabled?: boolean;
  defaultValue?: string | number | boolean;
  value?: string | number | boolean;
  onExpand?: (state: boolean) => void;
  onChange?: (option: SelectOption) => void;
}

export const Select = ({
  className = '',
  options,
  placeholder,
  isDisabled,
  defaultValue,
  onExpand,
  onChange
}: props) => {
  const [isExpanded, onExpandedStateChange] = useState(false)
  const [selectedOption, onSelectOption] = useState(
    options.find(({ value }) => defaultValue === value)
  )
  useEffect(() => {
    onExpand && onExpand(isExpanded)
  }, [isExpanded])
  useEffect(() => {
    onChange && selectedOption && onChange(selectedOption)
  }, [selectedOption])
  useEffect(() => {
    const newSelectedOption = options.find(
      ({ value }) => defaultValue === value
    )
    onSelectOption(newSelectedOption)
  }, [defaultValue])

  const handleExpandClick = () => onExpandedStateChange(!isExpanded)

  const handleOutsideClick = () => onExpandedStateChange(false)

  const handleSelectClick = (value: any) => {
    const newOption = options.find(({ value: v }) => v === value)
    onExpandedStateChange(false)
    onSelectOption(newOption)
  }

  const expandButtonClass = isExpanded ? 'select-menu__button--active' : ''
  const expanListClass = isExpanded ? 'select-menu__menu--active' : ''
  const disabledColorClass = isDisabled ? 'icon--black-3' : ''

  return (
    <OutsideClickHandler
      onOutsideClick={handleOutsideClick}
      disabled={!isExpanded}
    >
      <div className={`${style} select-menu ${className}`}>
        <button
          className={`select-menu__button ${expandButtonClass} ${disabledColorClass}`}
          onClick={handleExpandClick}
          disabled={isDisabled}
          title={selectedOption?.title}
          type='button'
        >
          <span className='select-menu__label'>
            {(selectedOption && selectedOption.label) || placeholder}
          </span>
          <span className='select-menu__caret'>
            <svg className='svg' width='8' height='7' viewBox='0 0 8 7' xmlns='http://www.w3.org/2000/svg'><path d='M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z' fill-rule='evenodd' fill-opacity='1' stroke='none' /></svg>
          </span>
        </button>
        <ul
          className={`select-menu__menu ${expanListClass} ${disabledColorClass}`}
          style={{ top: '-24px' }}
        >
          {options &&
            options.map(({ value, label, divider, title }, i) =>
              divider
                ? (
                  <React.Fragment key={`select-option-divider--${i}`}>
                    {divider !== true && (
                      <span className='select-menu__divider-label'>
                        {divider}
                      </span>
                    )}
                    <div
                      className='select-menu__divider'
                      key={`select-option--${i}`}
                    />
                  </React.Fragment>
                  )
                : (
                  <li
                    className={`select-menu__item ${selectedOption && selectedOption.value === value
                      ? 'select-menu__item--selected'
                      : ''
                    }`}
                    onClick={() => handleSelectClick(value)}
                    key={`select-option--${i}`}
                    title={title}
                  >
                    <span className='select-menu__item-icon' />
                    <span className='select-menu__item-label'>{label}</span>
                  </li>
                  )
            )}
        </ul>
      </div>
    </OutsideClickHandler>
  )
}
