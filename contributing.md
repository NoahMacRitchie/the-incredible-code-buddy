## How to run locally

### Obtain Discord bot API token
1. Login into `https://discordapp.com/developers/applications`
1. Create a new application
1. Create a new bot under the application
1. Now you should be able to generate a Client Secret which is your Discord API token!
1. Add the token to a .env file in the project root:
```
DISCORD_KEY=YOUR_API_KEY
```

### Add your bot to a server
1. Insert `<YOUR_API_KEY>` and paste the following link into your browser `https://discord.com/oauth2/authorize?client_id=<YOU_API_KEY>&permissions=1133584&scope=bot`
1. Choose a server and add your bot!

### Run the node server
1. Clone the repo `git clone https://github.com/NoahMacRitchie/trevor-bot.git`
1. Navigate into project directory `cd ./trevor-bot`
1. Install npm dependencies `npm i`
1. Make sure you have your 

## Contributing

### Contribution workflow
1. Fork the repo and clone it locally `git clone https://github.com/<your-github>/trevor-bot.git`
1. Create your feature branch `git checkout -b feature/add-my-awesome-feature`
1. Commit your changes `git commit -m 'added some awesome-feature'`
1. Push your changes to your local branch `git push --set-upstream`
1. Back on github, start a new pull request ![Pull](https://cdn.discordapp.com/attachments/820540696418189312/820554488226119700/unknown.png) 
1. Make sure you choose `NoahMacRitchie/trevor-bot` as the base repository ![img](https://cdn.discordapp.com/attachments/820540696418189312/820554940783001610/unknown.png)

### How to add a new trevor-bot command
1. Create a new .js file inside /commands/ directory like `/commands/joke.js`
1. Past the following basic snippet:
```
module.exports = {
  name: 'joke',
  description: 'Tells a funny joke',
  execute(message, args) {
    message.reply('Funny joke haha.');
  },
};
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
