import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"
import Movies from "./pages/Movies/Movies"
import Groups from "./pages/Groups/Groups"
import Profile from "./pages/Profile/Profile"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Groups" element={<Groups />} />
            <Route path="/Profile" element={<Profile />} />


            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
        </Routes>
    )
}

export default App;