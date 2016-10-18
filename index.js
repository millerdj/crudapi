const { MongoClient } = require('mongodb');
const createApp = require('./create-app')

const MONGO_URI = 'mongodb://localhost:27017/books';
const PORT = 3000;


MongoClient.connect(MONGO_URI, (err, db) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const app = createApp(db);

  app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
  })
})
