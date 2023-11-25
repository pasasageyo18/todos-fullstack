// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const uri = process.env.MONGODB_URL;
const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (IS_DEVELOPMENT) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
