const fs = require('fs');

const creds = {
  type: 'service_account',
  project_id: 'hack-break',
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
};

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
  description: 'Mod!',
  execute(message, args) {
    fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, JSON.stringify(creds), (error) => {
      if (error) {
        console.log(error);
      } else {
        const statement = args.join(' ');
        quickstart(statement).then((comment) => {
          message.channel.send(comment);
        });
      }
    });
  },
};
