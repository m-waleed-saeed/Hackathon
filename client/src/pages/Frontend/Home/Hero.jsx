import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../redux/store";

const Hero = () => {
  const [images, setImages] = useState([]);

  const layout = [
    { col: "col-span-3", row: "row-span-12" },
    { col: "col-span-2", row: "row-span-6" },
    { col: "col-span-4", row: "row-span-6" },
    { col: "col-span-3", row: "row-span-12" },
    { col: "col-span-4", row: "row-span-6" },
    { col: "col-span-2", row: "row-span-6" },
  ];

  useEffect(() => {
    axios.get(`${baseURL}/hero`).then((res) => setImages(res.data?.images || []));
  }, []);

  return (
    <div className="min-h-screen py-10">
      <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
        {layout.map((pos, i) => (
          <div key={i} className={`${pos.col} ${pos.row} rounded-md`}>
            {images[i] && (
              <img
                className="h-full w-full object-cover rounded-md"
                src={images[i]}
                alt={`hero-${i}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
