import "./Nav.css";
import aaiglogo from "./assets/aaiglogo.png";
import finslogo from "./assets/finslogo.jpg";

const Nav: React.FC = () => {
  return (
    <>
      <span className="nav-container">
        <img className="logo" src={aaiglogo} alt="AAIG Logo" />
        <div className="item-group">
          <img className="finslogo" src={finslogo} alt="FINS Logo" />
        </div>
      </span>
    </>
  );
};

export default Nav;
