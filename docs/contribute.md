## Contributing

### Contribution workflow
1. Fork the repo and clone it locally `git clone https://github.com/<your-github>/trevor-bot.git`
1. Create your feature branch `git checkout -b feature/add-my-awesome-feature`
1. Commit your changes `git commit -m 'added some awesome-feature'`
1. Push your changes to your local branch `git push --set-upstream`
1. Back on github, start a new pull request on your repo
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