const client = require('../lib/client');
const quotes = require('./quotes.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

   
      
    
    await Promise.all(
      quotes.map(quote => {
        return client.query(`
                    INSERT INTO quotes (content)
                    VALUES ($1);
                `,
        [quote.content]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}