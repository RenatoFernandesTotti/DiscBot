import * as play from "./play";
import * as skip from "./skip";
import * as queue from "./queue";

export const musicMetaData = [play.metaData, skip.metaData, queue.metaData];

export const musicActions = {
  play: play.action,
  skip: skip.action,
  queue: queue.action,
};
