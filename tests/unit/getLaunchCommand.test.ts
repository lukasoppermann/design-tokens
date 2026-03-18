import getLaunchCommand from '@utils/getLaunchCommand'
import { commands } from '@config/commands'

describe('getLaunchCommand', () => {
  test('returns the selected menu command when available', () => {
    const command = getLaunchCommand({
      command: commands.generalSettings,
      editorType: 'figma',
      mode: 'default',
      vscode: undefined
    } as Pick<PluginAPI, 'command' | 'editorType' | 'mode' | 'vscode'>)

    expect(command).toStrictEqual(commands.generalSettings)
  })

  test('falls back to export in dev inspect mode', () => {
    const command = getLaunchCommand({
      command: undefined,
      editorType: 'dev',
      mode: 'inspect',
      vscode: undefined
    } as Pick<PluginAPI, 'command' | 'editorType' | 'mode' | 'vscode'>)

    expect(command).toStrictEqual(commands.export)
  })

  test('falls back to export when running in vscode', () => {
    const command = getLaunchCommand({
      command: undefined,
      editorType: 'figma',
      mode: 'default',
      vscode: {}
    } as Pick<PluginAPI, 'command' | 'editorType' | 'mode' | 'vscode'>)

    expect(command).toStrictEqual(commands.export)
  })

  test('returns undefined when there is no supported launch context', () => {
    const command = getLaunchCommand({
      command: undefined,
      editorType: 'figma',
      mode: 'default',
      vscode: undefined
    } as Pick<PluginAPI, 'command' | 'editorType' | 'mode' | 'vscode'>)

    expect(command).toBeUndefined()
  })
})
