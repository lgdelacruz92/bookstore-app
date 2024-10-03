const booksUrl = `${process.env.REACT_APP_BOOK_API_URL}/books`;

export type BookRequestType = {
  search?: string;
  page?: string;
};
export const getBooks = async ({ search, page }: BookRequestType) => {
  const urlParams = new URLSearchParams();
  if (page) {
    urlParams.set("page", `${page}`);
  }
  if (search) {
    urlParams.set("search", search);
  }
  const token = localStorage.getItem("token") ?? "";
  console.log("token", token);
  return await fetch(`${booksUrl}?${urlParams.toString()}`, {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
