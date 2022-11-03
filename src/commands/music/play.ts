import { ChatInputCommandInteraction, GuildMember } from "discord.js";
import { getQueue, player } from "./constants";

const metaData = {
  name: "play",
  description: "Play music",
  options: [
    {
      type: 3,
      description: "Name or music URL (youtube)",
      name: "query",
      min_value: 2,
      required: true,
    },
  ],
};

const action = async (interaction: ChatInputCommandInteraction) => {
  if (!(interaction?.member instanceof GuildMember)) return;

  if (!interaction.member.voice.channelId)
    return await interaction.reply({
      content: "You are not in a voice channel!",
      ephemeral: true,
    });
  if (
    interaction?.guild?.members?.me?.voice.channelId &&
    interaction.member.voice.channelId !==
      interaction.guild.members.me.voice.channelId
  )
    return await interaction.reply({
      content: "You are not in my voice channel!",
      ephemeral: true,
    });

  const query = interaction.options.getString("query");

  const queue = getQueue(interaction);

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
