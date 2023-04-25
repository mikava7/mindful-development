import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, selectAuthStatus } from "../redux/slices/auth";
import { RootState } from "../redux/store";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const authStatus = useSelector((state: RootState) => selectAuthStatus(state));
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.data);
  console.log("user", user);
  console.log("authStatus", authStatus);

  const onClickLogout = () => {
    // Prompt the user to confirm they want to log out
    if (window.confirm("Do you want to log out?")) {
      // Dispatch the clearUserData action to clear the user data in Redux store
      dispatch(clearUserData());
      // Remove the token from local storage
      window.localStorage.removeItem("token");
    }
  };
  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="header-title">Header</h1>
        <Link to="/products"> Products</Link>
        <div className="header-links">
          <Link to="/" className="header-link">
            Home
          </Link>
          <div className="header-auth">
            {authStatus ? (
              <>
                <Link
                  to="/create-post"
                  className="header-link"
                >
                  create post
                </Link>
                <button
                  className="header-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
                <p>{user.fullName}</p>
              </>
            ) : (
              <>
                <Link to="/login" className="header-link">
                  Login
                </Link>
                <Link to="/register" className="header-link">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
