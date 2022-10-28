import { Link } from "react-router-dom";

const Navbar = ({ props }) => {
  let user = {};
  if (props) {
    user = props?.user;
  } else {
    user = JSON.parse(sessionStorage.getItem('user'))
  }
  const logout = () => {
    sessionStorage.clear();
    window.open("http://localhost:5000/api/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo mb-3">
        <Link className="link" to="/">
          Leave Management System
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;