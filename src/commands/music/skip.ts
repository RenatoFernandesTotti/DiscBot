import { ChatInputCommandInteraction } from "discord.js";
import { getQueue } from "./constants";

const metaData = {
  name: "skip",
  description: "Skip current track",
};

const action = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  const queue = getQueue(interaction);

  if (queue.tracks.length === 0) {
    return await interaction.followUp({
      content: `⏭️ No song to skip!`,
    });
  }

  queue.skip();

  return await interaction.followUp({
    content: `⏭️ skipping...`,
  });
};

export { action, metaData };
