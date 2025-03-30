import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Stream from "./pages/Stream";
import Landing from "./pages/Landing";
import Navbar from "./components/ui/Navbar";
import { useEffect, useState } from "react";
import { getUser } from "./actions/auth.actions";

function App() {
 

    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/stream" element={<Stream />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
