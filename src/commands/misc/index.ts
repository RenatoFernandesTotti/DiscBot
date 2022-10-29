import * as ping from "./ping";
import * as roll from "./rollDice";

const miscMetadata = [ping.metaData,roll.metaData];

const miscActions = {
  ping: ping.action,
  roll: roll.action
};

export { miscActions, miscMetadata };
