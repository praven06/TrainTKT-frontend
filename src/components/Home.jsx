import React from "react";
import data from "../assets/train-data.json";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.islogged.islogged);
  const username = useSelector((state) => state.user.name);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    navigate("/book", {
      state: { destination: formData.destination, source: formData.source },
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navbar className="fixed top-0 w-full z-10" />
      <div className="flex flex-col items-center justify-center pt-20">
        <h2 className="text-4xl font-bold mb-8 text-teal-300">
          Welcome to Train-Tkt
        </h2>

        {username && (
          <p className="text-xl text-teal-400 mb-6">Hello, {username}!</p>
        )}

        <div className="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-teal-300"
              >
                Select Source
              </label>
              <input
                type="text"
                id="source"
                {...register("source", {
                  required: "Please enter a source",
                  validate: (value) =>
                    data.some((item) =>
                      item.source.toLowerCase().includes(value.toLowerCase())
                    ) || "Source not found in our database",
                })}
                className="mt-1 block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
              />
              {errors.source && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.source.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-teal-300"
              >
                Select Destination
              </label>
              <input
                type="text"
                id="destination"
                {...register("destination", {
                  required: "Please enter a destination",
                  validate: (value) =>
                    data.some((item) =>
                      item.destination
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    ) || "Destination not found in our database",
                })}
                className="mt-1 block w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.destination.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-400 text-gray-900 font-semibold rounded-md shadow-sm hover:bg-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
            >
              Check Trains
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
