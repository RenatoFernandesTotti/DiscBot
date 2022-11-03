import { Player } from "discord-player";

import * as playdl from "play-dl";
import { ChatInputCommandInteraction, GuildResolvable } from "discord.js";
import { client } from "../../bootstrap";

export const player = new Player(client);


export function getQueue(interaction: ChatInputCommandInteraction) {
  return (
    player.getQueue(interaction?.guild as GuildResolvable) ||
    player.createQueue(interaction?.guild as GuildResolvable, {
      metadata: {
        channel: interaction.channel,
      },
      leaveOnEmpty: true,
      autoSelfDeaf: true,
      bufferingTimeout: 0,

      async onBeforeCreateStream(track, source, _queue) {
        // only trap youtube source
        if (source === "youtube") {
          return (
            await playdl.stream(track.url, {
              discordPlayerCompatibility: true,
            })
          ).stream;
        }
      },
    })
  );
}
