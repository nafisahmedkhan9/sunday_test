import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  let isLoggedIn = localStorage.getItem("is_login");
  
  return (
    <div>
      <h1>Page Not Found</h1>
      <h2>Available Links</h2>
      {isLoggedIn === "yes" ? (
        <Link to={"/users"}>Users</Link>
      ) : (
        <>
          <Link to={"/login"} style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to={"/registration"} style={{ marginRight: "15px" }}>
            Registration
          </Link>
        </>
      )}
    </div>
  );
}
