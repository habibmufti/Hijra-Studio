
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DATABASE_NAME);
export  {database};
