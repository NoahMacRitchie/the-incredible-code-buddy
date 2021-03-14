const response = 'You rolled...\n';

function rollDice(x) {
  console.log(`Rolling: ${x}`);
  return Math.ceil(Math.random() * x);
}

function isNormalInteger(str) {
  return /^\d+$/.test(str);
}

module.exports = {
  name: 'diceroll',
  description: 'Rolls a dice.',
  execute(message, args) {
    // error checking: argument(s) are a number.
    if (args[0]) {
      if (!isNormalInteger(args[0])) {
        message.channel.send('Arguments must use positive numbers, baka!');
        return;
      } if (args[1]) {
        if (!isNormalInteger(args[1])) {
          message.channel.send('Arguments must use positive numbers, baka!');
          return;
        }
      }
    }

    // error checking: negatives
    if (args[0] < 1 || args[1] < 0) {
      message.channel.send("You can't roll a number less than one! uwu Try '!diceroll 2 6' to roll two 6-sided die!");
      return;
    }

    // Logic to roll dice, depending on args.
    if (args[0] && args[1]) {
      const rolls = [];
      for (let i = 0; i < args[0]; i++) {
        rolls.push(rollDice(args[1]));
      }
      message.channel.send(response + rolls.toString());
    } else if (args[0]) {
      message.channel.send(response + rollDice(args[0]));
    } else {
      message.channel.send(response + rollDice(6));
    }
  },
};

// Made by Hans Sy
