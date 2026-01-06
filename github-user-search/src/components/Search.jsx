import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setUsers([]);
    setPage(1);
    setLoading(true);
    setError("");

    try {
      const data = await fetchAdvancedUsers(
        username,
        location,
        minRepos,
        1
      );
      setUsers(data.items);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    const data = await fetchAdvancedUsers(
      username,
      location,
      minRepos,
      nextPage
    );

    setUsers([...users, ...data.items]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Repositories"
          className="border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button className="bg-black text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="mt-4 flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-3 rounded flex items-center gap-3"
          >
            <img
              src={user.avatar_url}
              className="w-12 h-12 rounded-full"
            />
            <a
              href={user.html_url}
              target="_blank"
              className="text-blue-600"
            >
              {user.login}
            </a>
          </div>
        ))}
      </div>

      {users.length > 0 && !loading && (
        <button
          onClick={loadMore}
          className="mt-4 bg-gray-800 text-white p-2 rounded w-full"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;
