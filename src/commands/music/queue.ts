import { ChatInputCommandInteraction } from "discord.js";
import { getQueue, isVoiceConnOk } from "./shared/constants";

const metaData = {
  name: "queue",
  description: "Shows queue for server",
};

const action = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  const queue = getQueue(interaction);

  if (queue.tracks.length === 0) {
    return await interaction.followUp({
      content: `⏭️ No songs on queue!`,
    });
  }

  const tracks = queue.tracks;

  const tracksFormatted = tracks
    .map(({ title }, index) => {
      return `${index + 1} | ${title}`;
    })
    .join("\n");

  return await interaction.followUp({
    content: tracksFormatted,
  });
};

export { action, metaData };
