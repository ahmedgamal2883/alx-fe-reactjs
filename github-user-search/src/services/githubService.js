import axios from "axios";

export const fetchAdvancedUsers = async (
  username,
  location,
  minRepos,
  page = 1
) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(
    `https://api.github.com/search/users`,
    {
      params: {
        q: query,
        page: page,
        per_page: 5
      }
    }
  );

  return response.data;
};
