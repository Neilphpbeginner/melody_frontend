import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  let currentUser;
  let [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/api/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has failed!");
        })
        .then((resObject) => {
          currentUser = {
            user: {
              name: resObject.user.displayName,
              username: resObject.user.id,
            }
          }
          sessionStorage.setItem('user', JSON.stringify(currentUser));
          setUser(currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
    if(!currentUser){
      user = setUser(JSON.parse(sessionStorage.getItem('user')))
    }
  }, []);


  return (
    <BrowserRouter>
      <div>
        <Navbar currentUser={user || currentUser} />
        <Routes>
          <Route path="/" element={<Home user={user || currentUser} />} />
          <Route
            path="/login"
            element={user || currentUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;