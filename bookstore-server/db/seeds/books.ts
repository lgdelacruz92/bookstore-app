import * as fs from "fs";
import * as csv from "csv-parser";
import * as path from "path";
import { defaultImgURL } from "../index";

interface Book {
  title: string;
  author: string;
  details: string;
  imgUrl: string;
}

const results: Book[] = [];

export const getBooks = async (): Promise<Array<Book>> => {
  return new Promise((res, rej) => {
    fs.createReadStream(path.join(process.cwd(), "db/seeds/books.csv")) // Replace with your CSV file path
      .pipe(csv())
      .on("data", (data) => {
        const { genre, height, publisher } = data;
        results.push({
          title: data.title,
          author: data.author,
          details: `${genre};${height};${publisher}`,
          imgUrl: defaultImgURL,
        });
      })
      .on("end", () => {
        res(results);
      })
      .on("error", () => {
        rej("failed get books");
      });
  });
};

// getBooks().then((res) => console.log(res));
