const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const prefix = '!';

client.on('message', function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
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
