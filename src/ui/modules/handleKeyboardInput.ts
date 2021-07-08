import { commands } from '@config/commands'
import { KeyboardEvent } from 'react'

const getKeyboardFocusableElements = (element = document): HTMLElement[] => {
  // @ts-ignore
  return [...element.querySelectorAll(
    'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
  )]
    .filter(el => !el.hasAttribute('disabled'))
}

const trapFocus = (event) => {
  const focusableElements = getKeyboardFocusableElements()
  const lastFocusableEl = focusableElements[focusableElements.length - 1]
  /* shift + tab */
  if (event.shiftKey && document.activeElement === focusableElements[0]) {
    lastFocusableEl.focus()
    event.preventDefault()
  }
  /* tab */
  if (!event.shiftKey && document.activeElement === lastFocusableEl) {
    focusableElements[0].focus()
    event.preventDefault()
  }
}

export const handleKeyboardInput = (event: KeyboardEvent, figmaUIApi) => {
  // close dialog on escape
  if (event.code === 'Escape') {
    // abort on select
    if (document.activeElement.classList.contains('select-menu__button--active')) {
      return
    }
    // close window
    figmaUIApi.postMessage({
      pluginMessage: {
        command: commands.closePlugin
      }
    // @ts-ignore
    }, '*')
  }
  // capture focus
  if (event.code === 'Tab') {
    trapFocus(event)
  }
}
