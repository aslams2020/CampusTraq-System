const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/health-leave";
let dbConnection = null;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

async function connectDB() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        dbConnection = client.db();
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!dbConnection) {
        throw new Error("❌ Database not initialized. Call connectDB() first.");
    }
    return dbConnection;
}

// ✅ Correct export
module.exports = { connectDB, getDB };
