// create all necessary pieces
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production")
  config({ path: __dirname + "/../.env" });

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// start bot
import { startBot } from "./app";
import { refreshCommands } from "./refreshCommands";

refreshCommands().then(() => {
  startBot();
});
