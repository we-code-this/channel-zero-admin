import { commands } from "react-mde";

export function editorCommands() {
  return [
    {
      commands: [
        commands.boldCommand,
        commands.italicCommand,
        commands.linkCommand
      ]
    },
    {
      commands: [commands.unorderedListCommand, commands.orderedListCommand]
    }
  ];
}
