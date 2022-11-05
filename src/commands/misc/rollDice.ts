import {
  ChatInputCommandInteraction,
  CommandInteractionOptionResolver,
  Options,
} from "discord.js";
import { destructOptions } from "../../utils/destructOptions";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const metaData = {
  name: "roll",
  description: "Roll dice!",
  options: [
    {
      type: 4,
      description: "Dice size",
      name: "dice_size",
      min_value: 2,
      required: true,
    },
    {
      type: 4,
      description: "Number of dices",
      name: "dice_quantity",
      min_value: 1,
    },
  ],
};

const action = async (interaction: ChatInputCommandInteraction) => {
  const { dice_size, dice_quantity } = destructOptions(
    interaction.options as CommandInteractionOptionResolver,
    metaData.options
  );

  const rolledDices: number[] = [];
  const diceNumber = dice_quantity || 1;

  for (let index = 0; index < diceNumber; index++) {
    rolledDices.push(randomInt(1, dice_size));
  }

  const sum = rolledDices.reduce((reduced, current) => {
    return reduced + current;
  }, 0);

  const messageSum = `🎲 | You rolled a ${diceNumber}d${dice_size} and got ${sum}`;
  const messageDiscrete = `📖 | ${sum} ==> ${rolledDices.join("+")} `;

  await interaction.reply([messageSum, messageDiscrete].join("\n"));
};

export { action, metaData };
