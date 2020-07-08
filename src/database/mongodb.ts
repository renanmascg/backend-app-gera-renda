import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://0.0.0.0:27017/achaki', {
	useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
	console.info('🥳Connected to Mongo via Mongoose 🥳');
});

mongoose.connection.on('error', err => {
	console.error('Unable to connect to Mongo via Mongoose', err);
});
