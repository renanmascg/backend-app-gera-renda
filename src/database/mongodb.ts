import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI ?? '', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
	console.info('🥳Connected to Mongo via Mongoose 🥳');
});

mongoose.connection.on('error', err => {
	console.error('Unable to connect to Mongo via Mongoose', err);
});
