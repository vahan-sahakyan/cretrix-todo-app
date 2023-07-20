import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/todo.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { dispatch, getState } = store;

export type TRootState = ReturnType<typeof getState>;
export type TAppDispatch = typeof dispatch;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
