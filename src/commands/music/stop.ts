import { ChatInputCommandInteraction } from "discord.js";
import { getQueue, isVoiceConnOk } from "./shared/constants";

const metaData = {
  name: "stop",
  description: "Stop everything and kicks bot",
};

const action = async (interaction: ChatInputCommandInteraction) => {
  if (!(await isVoiceConnOk(interaction))) {
    return;
  }

  await interaction.deferReply();

  const queue = getQueue(interaction);

  if (!queue.playing) {
    return await interaction.followUp({
      content: `⏭️ Not playing anything!`,
    });
  }

  queue.stop();

  return await interaction.followUp({
    content: "Clearing queue and quitting",
  });
};

export { action, metaData };
