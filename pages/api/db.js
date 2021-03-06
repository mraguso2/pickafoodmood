import mongoose from 'mongoose';

const db = async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};

export default db;
