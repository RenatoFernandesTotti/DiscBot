import { client } from "./bootstrap";

import { routeAction } from "./commands/commandRouter";
const { TOKEN } = process.env;

const startBot = async () => {
  client.on("ready", () => {
    if (client?.user?.tag) console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction: any) => {
    routeAction(interaction);
  });

  client.login(TOKEN);
};


export { startBot };
