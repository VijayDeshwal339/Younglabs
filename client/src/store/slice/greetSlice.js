// src/redux/greetSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchGreeting = createAsyncThunk(
  "greet/fetchGreeting",
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/greet?name=${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  }
);

const greetSlice = createSlice({
  name: "greet",
  initialState: { message: "", error: null, loading: false },
  reducers: {
    clearGreeting: (state) => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = null;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGreeting } = greetSlice.actions;

export default greetSlice.reducer;
