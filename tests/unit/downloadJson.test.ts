import { downloadJson } from '@ui/modules/downloadJson'
import { commands } from '@config/commands'

describe('downloadJson', () => {
  const createObjectURL = jest.fn()
  const revokeObjectURL = jest.fn()

  beforeAll(() => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('posts closePlugin when there are no tokens to export', () => {
    const parent = { postMessage: jest.fn() }
    const link = { href: '', click: jest.fn() } as unknown as HTMLAnchorElement

    downloadJson(parent, link, '[]')

    expect(parent.postMessage).toHaveBeenCalledWith({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '⛔️ No design token detected!'
        }
      }
    }, '*')
  })

  it('posts closePlugin when the download fails', () => {
    const parent = { postMessage: jest.fn() }
    const link = {
      href: '',
      click: jest.fn(() => {
        throw new Error('download failed')
      })
    } as unknown as HTMLAnchorElement

    createObjectURL.mockReturnValue('blob:test')

    downloadJson(parent, link, '{"token":"value"}')

    expect(parent.postMessage).toHaveBeenCalledWith({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '⛔️ Design token failed!'
        }
      }
    }, '*')
  })
})
