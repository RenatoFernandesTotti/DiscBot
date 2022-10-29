import { config } from "dotenv";
config({ path: __dirname + "/../.env" });

import { startBot } from "./app";
import { refreshCommands } from "./refreshCommands";
refreshCommands();
startBot();
