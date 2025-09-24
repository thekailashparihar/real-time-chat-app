import mongoose from "mongoose";

export const establishDBConnection = async () => {
    const mongoDBUri = process.env.MONGODB_URI;
    try {
        const conn = await mongoose.connect(mongoDBUri);
        console.log("\nMongoDB Connected Successfully", conn.connection.host);
    } catch (error) {
        console.error("MongoDB Connection Error", error);
        process.exit(1);
    }
};
