import { BaseInteraction } from "discord.js";
import { routeAction } from "./commands/commandRouter";

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { TOKEN } = process.env;

const startBot = async () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction: BaseInteraction) => {
    routeAction(interaction)
  });

  client.login(TOKEN);
};

export { startBot };
