const { MessageEmbed } = require('discord.js');

const numberEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

const embededPollBuilder = (message, question, responses) => {
  const embededPoll = new MessageEmbed();
  embededPoll.setColor('#743873');
  embededPoll.setTitle(`Poll - ${question}`);
  embededPoll.setAuthor(message.author.username, message.author.avatarURL());
  for (let i = 0; i < responses.length; i++) {
    embededPoll.addField(`${responses[i].emoji} - ${responses[i].value}`, '\u200b');
  }
  embededPoll.setTimestamp();
  return embededPoll;
};

module.exports = {
  name: 'poll',
  description: 'Create Polls for voting',
  execute(message, args) {
    if (!args[0]) {
      message.reply('Please specify a question.');
      return;
    }
    const fullMSG = args.join(' ');

    const pollArray = fullMSG.match(/".*?"/g);

    if (!pollArray || pollArray.length < 1) {
      message.reply('Invalid format for creating a poll');
      return;
    }

    if (pollArray.length >= 10) {
      message.reply('Too many arguments');
      return;
    }

    const pollQuestion = pollArray[0].split('"').join('');
    const pollResponses = [];
    if (pollArray.length === 1) {
      pollResponses.push({ emoji: '👍', value: 'Yes' });
      pollResponses.push({ emoji: '👎', value: 'No' });
    } else {
      for (let i = 1; i < pollArray.length; i++) {
        pollResponses.push({ emoji: `${numberEmojis[i]}`, value: pollArray[i].split('"').join('') });
      }
    }
    const embeddedPoll = embededPollBuilder(message, pollQuestion, pollResponses);

    message.channel.send(embeddedPoll).then((embeddedRes) => {
      for (let i = 0; i < pollResponses.length; i++) {
        embeddedRes.react(pollResponses[i].emoji);
      }
    });
  },
};
