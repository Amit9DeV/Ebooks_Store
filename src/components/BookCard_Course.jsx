import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Card from "./Card";

export default function BooksCard_Course() {
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://ebooks-store-backend.onrender.com"
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredBooks = getdata.filter((item) => item.price !== 0);

  // Handling loading and error states
  if (loading) {
    return (
      <p className="bg-red-700 h-11 w-96 flex items-center justify-center text-white rounded-lg p-14 text-2xl">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-center rounded-lg">Error: {error}</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((item) => (
          <Card key={item.id || uuidv4()} book={item} />
        ))}
      </div>
    </div>
  );
}
