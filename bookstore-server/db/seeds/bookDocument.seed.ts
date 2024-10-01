import { MongoClient } from "mongodb";
import { dbURI, dbName } from "../index";
import { getBooks } from "./books";

// Function to seed books into the database
async function seedBooks() {
  const client = new MongoClient(dbURI);

  try {
    // Connect to the MongoDB server
    await client.connect();
    const adminDb = client.db().admin();

    // Check if the database exists by listing all databases
    const { databases } = await adminDb.listDatabases();
    const dbExists = databases.some((db: any) => db.name === dbName);

    if (dbExists) {
      // Drop the database if it exists
      await client.db(dbName).dropDatabase();
      console.log(`Database ${dbName} dropped`);
    } else {
      console.log(`Database ${dbName} does not exist, proceeding with seeding`);
    }

    const database = client.db(dbName);
    const collection = database.collection("bookdocuments"); // Use your collection name

    // Insert the seed data into the collection
    const books = await getBooks();
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books inserted into the collection`);
  } catch (error) {
    console.error("Error seeding books:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the seed function
seedBooks().catch(console.error);
