import mongoose from 'mongoose';

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/filesharing';
    
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting to the database:', error.message);
    }
};

export default DBConnection;