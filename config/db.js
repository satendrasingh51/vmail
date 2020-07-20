const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodbURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('Database connected...')
    } catch (error) {
        console.error(error.massage)
        process.exit(1);
    }
}
module.exports = connectDB;

