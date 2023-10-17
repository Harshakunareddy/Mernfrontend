import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// for providing consistent and visually appealing design for our react application we use the above things

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

// usememo = it allows us to memoize the computing result and
// only changes when the dependencies are changed.
// memoization = storing the results of expensive function calls
// and returning the cached results
// when the same input occurs again
// it takes a function and the array of dependencies

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      {/* BrowserRouting:
          it enables you to create single-page applications 
          with multiple views or pages, 
          all without requiring a full page reloading.
      */}
      <BrowserRouter>
        {/* manage and provide themes for web application */}
        {/* here we give theme={theme} and again we can use that in any file of our application */}
        {/* by using the theme.primaryColor and etc..... */}
        <ThemeProvider theme={theme}>
          {/* by putting this at the top of our application's component we can ensure the following things */}
          {/* resetting the margins and paddings and ensure the consistent box sizing. */}
          {/* it also helps in creationg the consistent starting point for your app'n styles */}
          <CssBaseline />

          
          <Routes>
            

            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
