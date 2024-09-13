import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;
        
        // Correct event listener
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        
        connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
