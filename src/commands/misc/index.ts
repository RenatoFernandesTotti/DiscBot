import * as ping from "./ping";
import * as roll from "./rollDice";

export const miscMetadata = [ping.metaData, roll.metaData];

export const miscActions = {
  ping: ping.action,
  roll: roll.action,
};
