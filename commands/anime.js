const fetch = require('node-fetch');

async function asyncTest(query) {
  const response = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${query}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.ANIME_API_KEY,
      'x-rapidapi-host': 'jikan1.p.rapidapi.com',
    },
  });
  const blob = await response.json();
  const result = blob.results[0].url;
  return result;
}

module.exports = {
  name: 'anime',
  description: 'Looks up anime and returns relevent myanimelist.net page.',
  help: 'Run !anime followed by the title of the anime you want to search up',
  execute(message, args) {
    // do not run if missing the API key
    if (!process.env.ANIME_API_KEY) {
      console.log('Missing API key. Go to this link and add "x-rapidapi-key" into the .env');
      console.log('You will need to signup on rapidapi to obtain a key.');
      console.log('https://rapidapi.com/theapiguy/api/jikan1?endpoint=apiendpoint_e7aa0a5a-5b85-4785-a231-adab865f8d73');
      console.log('Enter ANIME_API_KEY="your-rapidapi-key-here"');
      return;
    }
    if (!args[0]) {
      message.channel.send('To search for anime, type `!anime <search query>`.');
    } else {
      let query = '';
      for (let i = 0; i < args.length; i++) {
        query = query.concat(args[i]);
        query = query.concat('%20');
      }
      asyncTest(query).then((test) => {
        message.channel.send(test);
      });
    }
  },
};

// Made by Hans Sy
