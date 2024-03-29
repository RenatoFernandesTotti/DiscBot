import { ChatInputCommandInteraction } from "discord.js";
import { isVoiceConnOk, getQueue } from "./shared/constants";

const metaData = {
  name: "skip",
  description: "Skip current track",
};

const action = async (interaction: ChatInputCommandInteraction) => {
  if (!(await isVoiceConnOk(interaction))) {
    return;
  }

  await interaction.deferReply();

  const queue = getQueue(interaction);

  if (queue.tracks.length === 0) {
    queue.stop();
    return;
  }

  queue.skip();

  return await interaction.followUp({
    content: `⏭️ skipping...`,
  });
};

export { action, metaData };
