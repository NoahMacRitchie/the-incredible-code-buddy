const fetch = require('node-fetch');

async function asyncTest(query) {
  const response = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${query}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8d69a01ab6msh12c303aaa758294p1e6dbejsn58a357f66d91',
      'x-rapidapi-host': 'jikan1.p.rapidapi.com',
    },
  });
  const blob = await response.json();
  console.log(blob.results[0].url);
  const result = blob.results[0].url;
  return result;
}

module.exports = {
  name: 'anime',
  description: 'Looks up anime.',
  execute(message, args) {
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

    // Alternative fetch method instead of async.
    // fetch("https://jikan1.p.rapidapi.com/search/anime?q=" + query, {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-key": "8d69a01ab6msh12c303aaa758294p1e6dbejsn58a357f66d91",
    //     "x-rapidapi-host": "jikan1.p.rapidapi.com"
    //   }
    // })
    // .then(response => response.json())
    // .then(blob => {
    //   message.channel.send(blob.results[0]["url"]);
    // })
    // .catch(err => {
    //   console.error(err);
    // });
  },
};

// Made by Hans Sy
