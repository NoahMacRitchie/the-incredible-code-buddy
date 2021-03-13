const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = '!';
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	if (command === 'diceroll') {
		console.log(args);

		if (args[0] && args[1]) {
			for (let i = 0; i < args[0]; i++) {
				message.channel.send(rollDice(args[1]));
			}
		} else if (args[0]) {
			message.channel.send(rollDice(args[0]));
		} else {
			message.channel.send(rollDice(6));
		}
	}
});

function rollDice(x) {
	console.log("Rolling: " + x);
	return Math.ceil(Math.random() * x);
}

client.login(config.BOT_TOKEN);
