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
  description: 'Looks up anime.',
  execute(message, args) {
    // do not run if missing the API key
    if (!process.env.ANIME_API_KEY) return;
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
