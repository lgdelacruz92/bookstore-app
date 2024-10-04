import { User } from "../types/user";
const usersUrl = `${process.env.REACT_APP_USER_API_URL}/users`;

export const getUserById = async (userId: string) => {
  return await fetch(`${usersUrl}/${userId}`, {
    method: "GET",
  });
};

export const createUser = async (token: string, userData: User) => {
  await fetch(`${usersUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
};
