import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// it simplifies the process of defining reducers
// and action creators
// for a slice or part of your application's state
export const authSlice = createSlice({
  // takes 3 arguments namely
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // actions are plain js objects that describe
    // what should change in the state
    setLogin: (state, action) => {
      // action.payload.user =  a specific piece of data
      //  within a redux action object
      // that have a type property and a
      // payload property = to carry data associated with the action
      state.user = action.payload.user;
      state.token = action.payload.token;

      // action.payload = conventional way to store data
      // and can be used to pass to the reducers
      // reducers = functions that specify how the state should change
      // in res to actions
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends not existed");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setFriends, setLogin, setLogout, setPost, setPosts, setMode } =
  authSlice.actions;

export default authSlice.reducer;
