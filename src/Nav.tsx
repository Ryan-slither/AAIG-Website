import { Link } from "react-router-dom";
import "./Nav.css";
import aaiglogo from "./assets/aaiglogo.png";

const Nav: React.FC = () => {
  return (
    <>
      <span className="nav-container">
        <Link to={"/"} className="logo-link">
          <img className="logo" src={aaiglogo} alt="AAIG Logo" />
        </Link>
        <div className="item-group">
          <Link to={"/"} className="item-link">
            <h3 className="item mokoto-orange">Home</h3>
          </Link>
        </div>
      </span>
    </>
  );
};

export default Nav;
