import { MongoClient } from "mongodb";
import { defaultImgURL, dbURI, dbName } from "../index";

// Seed data for books
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel set in the Jazz Age that explores themes of wealth, class, and love.",
    imgUrl: defaultImgURL,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about racial injustice in the Deep South, told through the eyes of a young girl.",
    imgUrl: defaultImgURL,
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel that delves into the dangers of totalitarianism and extreme political ideology.",
    imgUrl: defaultImgURL,
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    description:
      "The saga of Captain Ahab and his obsessive quest to catch the white whale, Moby-Dick.",
    imgUrl: defaultImgURL,
  },
];

// Function to seed books into the database
async function seedBooks() {
  const client = new MongoClient(dbURI);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(dbName);
    const collection = database.collection("bookdocuments"); // Use your collection name

    // Insert the seed data into the collection
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
