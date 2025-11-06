import { configDotenv } from "dotenv";
import mongoose from "mongoose"

configDotenv()
const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("connected!", connectionInstance.connection.host);
    } catch (error) {
        process.exit(1);
    }
}
export default connectDb;