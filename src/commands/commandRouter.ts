import { BaseInteraction } from "discord.js";

import { miscActions } from "./misc";
import { musicActions } from "./music";

const actionsMap: Record<string, any> = { ...miscActions, ...musicActions };

const routeAction = async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await actionsMap[interaction.commandName](interaction);
  } catch (error) {
    await interaction.channel?.send("Something went wrong");
  }
};

export { routeAction };
