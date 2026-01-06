import axios from 'axios';

export const fetchUser = async (username) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
