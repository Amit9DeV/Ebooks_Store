import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BooksCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    async function FetchData() {
       try {
        
        const res = await axios.get("https://ebooks-store-backend.onrender.com")
        setData(res.data)

       } catch (error) {
        console.log(error)
       }
       finally{
        setLoading(false)
       }
       console.log(data)
    }
    FetchData()
  }, []);

  const filteredBooks = data.filter((item) => item.price === 0);

  // Handling loading and error states
  if (loading) {
    return <p className="bg-red-600 p-5 rounded-lg text-2xl text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {filteredBooks.map((item) => (
          <Card key={uuidv4()} book={item} />
        ))}
      </Slider>
    </div>
  );
}
