import * as play from "./play";
import * as skip from "./skip";
import * as queue from "./queue";
import * as pause from "./pause";
import * as stop from "./stop";

export const musicMetaData = [
  play.metaData,
  skip.metaData,
  queue.metaData,
  pause.metaData,
  stop.metaData,
];

export const musicActions = {
  play: play.action,
  skip: skip.action,
  queue: queue.action,
  pause: pause.action,
  stop: stop.action,
};
