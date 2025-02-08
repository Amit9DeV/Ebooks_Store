import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import axios from "axios";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {filteredBooks.map((item) => (
          <Card key={item.id || uuidv4()} book={item} />
        ))}
      </Slider>
    </div>
  );
}
