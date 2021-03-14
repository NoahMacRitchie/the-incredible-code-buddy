const { MessageEmbed } = require('discord.js');

const fs = require('fs');

const embededHelpBuilder = (message, commands) => {
  const embededPoll = new MessageEmbed();
  embededPoll.setColor('#743873');
  embededPoll.setTitle('Help');
  embededPoll.setDescription('Simply type !help followed by one of the command names for more usage information');
  embededPoll.setAuthor(message.author.username, message.author.avatarURL());
  for (let i = 0; i < commands.length; i++) {
    embededPoll.addField(commands[i].name, commands[i].desc);
  }
  embededPoll.setTimestamp();
  return embededPoll;
};

const embededCommandHelpBuilder = (message, command) => {
  const embededPoll = new MessageEmbed();
  embededPoll.setColor('#743873');
  embededPoll.setTitle(`Command name: ${command.name}`);
  embededPoll.setAuthor(message.author.username, message.author.avatarURL());
  embededPoll.setDescription(command.description);
  embededPoll.addField('Usage', command.help);
  embededPoll.setTimestamp();
  return embededPoll;
};

module.exports = {
  name: 'help',
  description: 'Shows users information about the bots commands',
  help: 'Type !help [command name] to see what it does',
  execute(message, args) {
    const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
    const commands = [];
    if (args.length === 0) {
      for (const file of commandFiles) {
        const command = require(`./${file}`); // eslint-disable-line import/no-dynamic-require
        commands.push({ name: command.name, desc: command.description });
      }
      const embededHelp = embededHelpBuilder(message, commands);
      message.channel.send(embededHelp);
    } else {
      for (const file of commandFiles) {
        const command = require(`./${file}`); // eslint-disable-line import/no-dynamic-require
        if (command.name === args[0]) {
          const embededHelp = embededCommandHelpBuilder(message, command);
          message.channel.send(embededHelp);
          return;
        }
      }
      message.channel.send(`command ${args[0]} not found.`);
    }
  },
};
