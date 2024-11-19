"use client";
import { useState, useEffect } from "react";

const ApiPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("An unexpected error occurred"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
        POSTS FROM API
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <div
            key={post.id}
            className="bg-white border border-gray-300 shadow-md p-4 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-lg font-semibold text-purple-800 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiPostsPage;
