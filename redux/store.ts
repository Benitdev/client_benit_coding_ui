import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
// ...

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
    // headerState: headerReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
