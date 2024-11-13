import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import data from "../assets/train-data.json";
import Navbar from "./Navbar";

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.islogged.islogged);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const { destination = "", source = "" } = location.state || {};

  const filteredTrains = data.filter(
    (train) =>
      train.destination?.toLowerCase().includes(destination.toLowerCase()) &&
      train.source?.toLowerCase().includes(source.toLowerCase())
  );

  const handleTicketClick = (train, classType) => {
    navigate("/passenger-info", { state: { train, classType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 pt-16">
        <div className="mt-8">
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg mb-4 p-6 max-w-md mx-auto border border-gray-700"
              >
                <h3 className="text-2xl font-semibold text-teal-300">
                  {train.train_name} ({train.train_number})
                </h3>
                <p className="text-gray-400 mt-1">Source: {train.source}</p>
                <p className="text-gray-400">
                  Destination: {train.destination}
                </p>
                <p className="text-gray-400">
                  Departure Time: {train.departure_time}
                </p>
                <p className="text-gray-400">
                  Arrival Time: {train.arrival_time}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-teal-300">
                    Tickets:
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(train.ticket_price).map(
                      ([classType, price], priceIndex) => (
                        <li key={priceIndex} className="mb-2">
                          <button
                            onClick={() => handleTicketClick(train, classType)}
                            className="bg-teal-600 text-white rounded-md px-4 py-2 text-sm font-semibold shadow hover:bg-teal-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                          >
                            {classType}: ₹{price}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No trains found for the route from "{source}" to "{destination}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
