import { BaseInteraction } from "discord.js";

import { miscActions } from "./misc";

const actionsMap: Record<string, any> = { ...miscActions };

const routeAction = async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await actionsMap[interaction.commandName](interaction);
  } catch (error) {
    await interaction.reply("Something went wrong");
  }
};

export { routeAction };
