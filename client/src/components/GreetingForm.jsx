// src/components/GreetingForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGreeting, clearGreeting } from "../store/slice/greetSlice";

const GreetingForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.greet);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(fetchGreeting(name));
    }
  };

  const handleReset = () => {
    setName("");
    dispatch(clearGreeting());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to Younglabs!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
          Enter your name:
        </label>
        <input
          id="name"
          type="text"
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Greeting"}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      {(message || error) && (
        <button
          onClick={handleReset}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default GreetingForm;
