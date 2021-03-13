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
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
    
    let evaluation;
    let percentage = Math.round((sentiment.score + 1) * 50);
    if (percentage > 75 && percentage <= 100)
      evaluation = "Great message! ";
    else if (percentage < 25 && percentage > 0)
      evaluation ="That is inappropriate ";
    else
      evaluation = "Seems okay to post. ";
    return evaluation + `(${percentage}%)`;
  }

module.exports = {
    name: 'mod',
    description: 'Mod!',
    execute(message, args) {
      let statement = args.join(' ');
      quickstart(statement).then((comment) => {
        message.channel.send(comment);
      });
    }
}
