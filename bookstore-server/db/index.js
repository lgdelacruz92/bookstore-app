"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultImgURL = exports.dbURI = exports.dbName = void 0;
var dotenv = require("dotenv");
dotenv.config();
var scheme = process.env.SCHEME;
var domain = process.env.DOMAIN;
var port = process.env.PORT;
// Define the MongoDB URI and Database Name
exports.dbName = "bookstore"; // Replace with your actual database name
exports.dbURI = "mongodb+srv://Cluster30875:".concat(process.env.MONGOOSE_PASSWORD, "@cluster30875.fp5ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster30875");
exports.defaultImgURL = "".concat(scheme, "://").concat(domain, ":").concat(port, "/images/book-cover-placeholder.jpg");
