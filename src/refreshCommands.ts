import { REST, Routes } from "discord.js";
import { miscMetadata } from "./commands/misc";
import { musicMetaData } from "./commands/music";

const commands = [...miscMetadata, ...musicMetaData];

const { TOKEN, CLIENT_ID } = process.env;
const rest = new REST({ version: "10" }).setToken(TOKEN || "");

const refreshCommands = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(CLIENT_ID || ""), {
        body: commands,
      });

      let currentCommands = (await rest.get(
        Routes.applicationCommands(CLIENT_ID || "")
      )) as any[];
      console.log(currentCommands.map(({ name }) => name));

      console.log("Successfully reloaded application (/) commands.");
    }
  } catch (error) {
    console.error(error);
  }
};

export { refreshCommands };
