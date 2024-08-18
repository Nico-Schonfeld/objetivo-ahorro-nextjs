import { createSlice } from "@reduxjs/toolkit";

export interface OpenSlice {
  isButtonActive: boolean; // Nuevo campo booleano
}

const initialState: OpenSlice = {
  isButtonActive: false, // Inicialmente desactivado
};

export const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    toggleButton: (state) => {
      state.isButtonActive = !state.isButtonActive; // Cambia el estado booleano
    },
  },
});

export const { toggleButton } = openSlice.actions;

export default openSlice.reducer;
