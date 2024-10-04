import { MongoClient } from "mongodb";
import { dbURI, dbName } from "../index";

async function migrateImgUrlDefault() {
  const client = new MongoClient(dbURI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(dbName);
    const collection = database.collection("bookdocuments"); // Use your collection name

    // Update all documents: rename `description` field to `details`
    const result = await collection.updateMany(
      { imgUrl: { $exists: true } }, // Find documents with a `description` field
      {
        $rename: {
          imgUrl: "http://localhost:5003/images/book-cover-placeholder.jpg",
        },
      } // Rename `description` to `details`
    );

    console.log(`Updated ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await client.close();
  }
}

migrateImgUrlDefault().catch(console.error);
