import { ChatInputCommandInteraction } from "discord.js";
import { getQueue } from "./shared/constants";

const metaData = {
  name: "pause",
  description: "pause player",
};

const action = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();
  const queue = getQueue(interaction);

  queue.setPaused(true)

  return await interaction.followUp({
    content: "Player stopped!",
  });
};

export { action, metaData };
