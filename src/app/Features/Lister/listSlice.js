import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  Lists: [{ id: 1, category: "Male", Name: "Hitesh Chaudary" }],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addtoList: (state, action) => {
      const list = {
        id: nanoid(),
        category: action.payload.category,
        Name: action.payload.Name,
      };
      state.Lists.push(list);
    },
    addFromAPI: (state, action) => {
      const list = {
        id: nanoid(),
        category: action.payload.category,
        Name: action.payload.Name,
      };
      state.Lists.push(list);
    },
    removeFromList: (state, action) => {
      state.Lists = state.Lists.filter((l) => l.id !== action.payload.id);
    },
    updateList: (state, action) => {
      state.Lists = state.Lists.map((l) =>
        l.id === action.payload.id
          ? {
              ...l,
              Name: action.payload.Name,
              category: action.payload.category,
            }
          : l
      );
    },
  },
});

export const { addtoList, removeFromList, updateList, addFromAPI } =
  listSlice.actions;
export default listSlice.reducer;
