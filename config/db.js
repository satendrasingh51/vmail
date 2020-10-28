const mongoose = require('mongoose');
const { MONGODB_URI} = require('./default');


const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
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

