import { Link } from "react-router-dom";
import "./LinkButton.css";

interface LinkButtonProps {
  buttonName: string;
  buttonLink: string;
  buttonLogo: string;
  logoHeight?: number;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  buttonName,
  buttonLink,
  buttonLogo,
  logoHeight = 30,
}) => {
  return (
    <Link
      to={buttonLink}
      className="link-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={buttonLogo}
        className="link-img"
        alt="Link Button"
        style={{ height: logoHeight }}
      />
      <div className="link-text">{buttonName}</div>
    </Link>
  );
};

export default LinkButton;
