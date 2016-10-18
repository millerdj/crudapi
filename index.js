const { MongoClient } = require('mongodb');
const createApp = require('./create-app')

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/books';
const PORT = process.env.PORT || 3000

const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI



MongoClient.connect(MONGDBO_URI, (err, db) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const app = createApp(db);

  app.listen(PORT, () => {
    NODE_ENV !== 'production' &&
    console.log('listening on port ' + PORT)
  })
})
