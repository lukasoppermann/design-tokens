import { commands, PluginCommands } from '@config/commands'

type FigmaLaunchContext = Pick<PluginAPI, 'command' | 'editorType' | 'mode' | 'vscode'>

const commandValues = Object.values(commands)

const getLaunchCommand = (figma: FigmaLaunchContext): PluginCommands | undefined => {
  if (typeof figma.command === 'string' && commandValues.includes(figma.command as PluginCommands)) {
    return figma.command as PluginCommands
  }

  if ((figma.editorType === 'dev' && figma.mode === 'inspect') || figma.vscode) {
    return commands.export
  }

  return undefined
}

export default getLaunchCommand
