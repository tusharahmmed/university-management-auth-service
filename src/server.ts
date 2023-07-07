import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function connectDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(
        `University management auth service listening on port ${config.port}`,
      );
    });
  } catch (err) {
    console.log(err, 'Fail to connect Database');
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

connectDatabase();
