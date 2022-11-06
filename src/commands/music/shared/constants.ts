import { Player } from "discord-player";

import * as playdl from "play-dl";
import {
  ChatInputCommandInteraction,
  GuildMember,
  GuildResolvable,
  TextBasedChannel,
} from "discord.js";
import { client } from "../../../bootstrap";
import { setupListeners } from "./listeners";

export const player = new Player(client);
setupListeners(player);

export function getQueue(interaction: ChatInputCommandInteraction) {
  return (
    player.getQueue<{ metadata: { channel: TextBasedChannel } }>(
      interaction?.guild as GuildResolvable
    ) ||
    player.createQueue(interaction?.guild as GuildResolvable, {
      metadata: {
        channel: interaction.channel,
      },
      autoSelfDeaf: true,
      bufferingTimeout: 0,
      volumeSmoothness: 10,
      spotifyBridge: true,

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

export function isInstanceOfGuildMember(
  interaction: ChatInputCommandInteraction
) {
  return interaction?.member instanceof GuildMember;
}

export async function isInVoiceChannel(
  interaction: ChatInputCommandInteraction
) {
  if (
    interaction?.member instanceof GuildMember &&
    !interaction.member.voice.channelId
  ) {
    await interaction.reply({
      content: "You are not in a voice channel!",
      ephemeral: true,
    });
    return false;
  }

  return true;
}

export async function isInSameVoiceChannel(
  interaction: ChatInputCommandInteraction
) {
  if (
    interaction?.member instanceof GuildMember &&
    interaction?.guild?.members?.me?.voice.channelId &&
    interaction.member.voice.channelId !==
      interaction.guild.members.me.voice.channelId
  ) {
    await interaction.reply({
      content: "You are not in my voice channel!",
      ephemeral: true,
    });
    return false;
  }

  return true;
}

export async function isVoiceConnOk(interaction: ChatInputCommandInteraction) {
  return (
    (await isInVoiceChannel(interaction)) &&
    (await isInSameVoiceChannel(interaction))
  );
}
