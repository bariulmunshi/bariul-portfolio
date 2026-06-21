import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            `MongoDB Connected: ${connection.connection.host}`
        );

        console.log(
            `Database Name: ${connection.connection.name}`
        );
    } catch (error) {
        console.error(
            "MongoDB Connection Failed:",
            error.message
        );

        process.exit(1);
    }
};

export default connectDB;