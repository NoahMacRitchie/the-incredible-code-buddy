async function findInfo(statement) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  const document = {
    content: statement,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeEntities({ document });
  const { entities } = result;

  console.log('Entities:');
  const list = [];
  entities.forEach((entity) => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
      list.push(entity.metadata.wikipedia_url);
    }
  });
  return list;
}

module.exports = {
  name: 'wiki',
  description: 'Searches for relevent wikipedia page',
  help: 'Run !wiki followed by your query',
  execute(message, args) {
    // do not run if missing the API key
    if (!process.env.GOOGLE_CREDENTIALS) return;
    const statement = args.join(' ');
    findInfo(statement).then((links) => {
      links.forEach((link) => {
        message.channel.send(link);
      });
    });
  },
};
