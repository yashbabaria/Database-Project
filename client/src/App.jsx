import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home"
import Movies from "./pages/Movies/Movies"
import Ratings from "./pages/Ratings/Ratings"
import MyRatings from "./pages/MyRatings/MyRatings"
import Login from "./pages/Login"


const App = () => {

    const [authenticated, setAuthenticated] = useState(true);

    function login() {
        setAuthenticated(true);
    }

    function signup() {
        setAuthenticated(true);
    }

    if (!authenticated) {
        return (
            <Login login={login} signup={signup} />
        )
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Ratings" element={<Ratings />} />
            <Route path="/MyRatings" element={<MyRatings />} />
        </Routes>
    )
}

export default App;