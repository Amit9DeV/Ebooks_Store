import React from "react";

function Card({ book }) {
  return (
    <div className="card bg-base-100 w-72 h-[450px]   shadow-xl m-5 flex-shrink-0">
      <figure>
        <img loading="lazy"
          className="w-2/3 rounded-lg mt-8 mx-auto"
          src={book.image}
          alt="Book"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {book.name}
          <div className="badge badge-secondary text-white">NEW</div>
        </h2>
        <p>Valuable Books</p>
        <div className="card-actions justify-between mt-5">
          <div className="badge badge-outline text-green-600 text-xl">
            ₹ {book.price}
          </div>
          <div className="badge">
            <button className="btn btn-success px-8">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
