import mongoose from "mongoose";


const mongodbURL = process.env.MONGODB_URL
export const dbConnect = async () => await mongoose.connect(mongodbURL)
    .then(() => console.log('Connected!'))
    .catch(err => console.error('Connection failed:', err));

