import {
  ChatInputCommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from "discord.js";
import { destructOptions } from "../../utils/destructOptions";
import {
  getQueue,
  isVoiceConnOk,
  player,
} from "./shared/constants";

const metaData = {
  name: "play",
  description: "Play music",
  options: [
    {
      type: 3,
      description: "Name or music URL (youtube)",
      name: "query",
      min_value: 2,
    },
  ],
};

const action = async (interaction: ChatInputCommandInteraction) => {
  if (!(interaction?.member instanceof GuildMember)) return;

  if (!(await isVoiceConnOk(interaction))) {
    return;
  }

  const { query } = destructOptions(
    interaction.options as CommandInteractionOptionResolver,
    metaData.options
  );

  const queue = getQueue(interaction);

  if (!query && queue.playing) {
    queue.setPaused(false);
    return await interaction.reply({ content: "⏭️ | Resuming player" });
  }

  // verify vc connection
  try {
    if (!queue.connection && interaction.member.voice.channel)
      await queue.connect(interaction.member.voice.channel);
  } catch {
    queue.destroy();
    return await interaction.reply({
      content: "Could not join your voice channel!",
      ephemeral: true,
    });
  }

  await interaction.deferReply();
  const track = await player
    .search(query || "", {
      requestedBy: interaction.user,
    })
    .then((x) => x.tracks[0]);
  if (!track)
    return await interaction.followUp({
      content: `❌ | Track **${query}** not found!`,
    });

  queue.play(track);

  return await interaction.followUp({
    content: `⏱️ | Loading track **${track.title}**!`,
  });
};

export { action, metaData };
