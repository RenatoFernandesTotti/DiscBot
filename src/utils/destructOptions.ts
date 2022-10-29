import { CommandInteractionOptionResolver } from "discord.js";

export function destructOptions(
  params: CommandInteractionOptionResolver,
  options: any[]
) {
  let optionsData = {};

  options.forEach((option) => {
    optionsData = { ...optionsData, [option.name]: params.get(option.name) };
  });
}
