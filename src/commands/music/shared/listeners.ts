import { Player, Queue } from "discord-player";
import { TextBasedChannel } from "discord.js";

export function setupListeners(player: Player) {
  player.on("trackStart", (queue, track) => {
    const typedQueue = queue as Queue<{ channel: TextBasedChannel }>;
    typedQueue.metadata?.channel.send(`Now playing: ${track.title} `);
  });
  player.on("trackAdd", (queue, track) => {
    const typedQueue = queue as Queue<{ channel: TextBasedChannel }>;
    typedQueue.metadata?.channel.send(`Added ${track.title} to queue`);
  });
  player.on('error',(queue,error)=>{
    const typedQueue = queue as Queue<{ channel: TextBasedChannel }>;
    typedQueue.metadata?.channel.send(`Someting went wrong!`);
  })
}
