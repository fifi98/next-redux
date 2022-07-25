import { createSlice } from "@reduxjs/toolkit";

interface FactsState {
  fact: string;
}

const initialState: FactsState = {
  fact: "",
};

export const factsSlice = createSlice({
  name: "facts",
  initialState,
  reducers: {
    setFact: (state, action) => {
      state.fact = action.payload;
    },
  },
});

export const { setFact } = factsSlice.actions;
export default factsSlice.reducer;
