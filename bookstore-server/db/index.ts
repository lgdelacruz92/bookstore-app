import * as dotenv from "dotenv";
dotenv.config();

const scheme = process.env.SCHEME;
const domain = process.env.DOMAIN;
const port = process.env.PORT;
// Define the MongoDB URI and Database Name
export const dbName = "bookstore"; // Replace with your actual database name
export const dbURI = `mongodb+srv://Cluster30875:${process.env.MONGOOSE_PASSWORD}@cluster30875.fp5ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster30875`;
export const defaultImgURL = `${scheme}://${domain}:${port}/images/book-cover-placeholder.jpg`;
