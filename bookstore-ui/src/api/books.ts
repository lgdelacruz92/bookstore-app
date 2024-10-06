const booksUrl = `${process.env.REACT_APP_BOOK_API_URL}/books`;

export type BookRequestType = {
  search?: string;
  page?: string;
  bookIds?: string;
};
export const getBooks = async ({ search, page, bookIds }: BookRequestType) => {
  const urlParams = new URLSearchParams();
  if (page) {
    urlParams.set("page", `${page}`);
  }
  if (search) {
    urlParams.set("search", search);
  }
  if (bookIds) {
    urlParams.set("bookIds", bookIds);
  }
  const token = localStorage.getItem("token") ?? "";
  return await fetch(`${booksUrl}?${urlParams.toString()}`, {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
