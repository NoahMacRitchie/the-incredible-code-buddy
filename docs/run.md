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
1. Make sure you have your `DISCORD_API` key is set in the `.env` file
1. Start the server `node index.js`