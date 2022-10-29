import { ChatInputCommandInteraction } from "discord.js";

const action = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply("Pong!");
};

const metaData = {
  name: "ping",
  description: "Replies with Pong!",
};

export { action, metaData };
