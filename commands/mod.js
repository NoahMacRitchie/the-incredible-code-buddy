async function quickstart(statement) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  const document = {
    content: statement,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;

  let evaluation;
  const percentage = Math.round((sentiment.score + 1) * 50);
  if (percentage > 75 && percentage <= 100) evaluation = 'Great message! ';
  else if (percentage < 25 && percentage > 0) evaluation = 'That is inappropriate ';
  else evaluation = 'Seems okay to post. ';
  return `${evaluation}(${percentage}%)`;
}

module.exports = {
  name: 'mod',
  description: 'The Mod commmand will tell you if a message is appropriate or not.'
   + 'It will also assign it a sentiment score (0-100%)',
  help: 'Run !mod followed by your message',
  execute(message, args) {
    // do not run if missing the API key
    if (!process.env.GOOGLE_CREDENTIALS) return;
    const statement = args.join(' ');
    quickstart(statement).then((comment) => {
      message.channel.send(comment);
    });
  },
};
