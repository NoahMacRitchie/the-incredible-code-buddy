## How to run locally

### Obtain Discord bot API token
To run the Discord bot in the first place, you WILL NEED an API token. This is a unique identifier of the application to allow access to your server.

1. Login into `https://discordapp.com/developers/applications`
1. Create a `New Application`
2. Enter a `Name` for your new application/bot and Create it.
![API token](https://cdn.discordapp.com/attachments/820540696418189312/820684792076828722/unknown.png)
4. Generate a Client Secret which is your Discord API token!
5. Create a blank file called `.env` in the root folder of your project
6. Add the token to the `.env` file in the project root:
```
DISCORD_KEY=YOUR_API_KEY
```

### Add your bot to a server
1. Insert `<YOUR_API_KEY>` and paste the following link into your browser `https://discord.com/oauth2/authorize?client_id=<YOU_API_KEY>&permissions=1133584&scope=bot`
1. Choose a server (where you have Admin powers) and add your bot!

### Run the node server
1. Clone the repo `git clone https://github.com/NoahMacRitchie/trevor-bot.git`
1. Navigate into project directory `cd ./trevor-bot`
1. Install npm dependencies `npm i`
1. Make sure you have your `DISCORD_API` key is set in the `.env` file
3. Start the server `node index.js`

* Please note that the server relies on other APIs such as Jikan and Google Cloud. 
* Some commands won't work unless your own API key is generated and put intisde .env
