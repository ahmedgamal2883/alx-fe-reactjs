// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com/search/users";

export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = "";

    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    const response = await axios.get(
      `${BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&per_page=30`
    );

    return response.data; // data.items فيها المستخدمين
  } catch (error) {
    console.error("Error fetching users:", error);
    return { items: [] };
  }
};
