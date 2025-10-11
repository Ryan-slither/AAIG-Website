import {
  conclusion,
  introText,
  liveFig2,
  liveFig3,
  systemDesign,
} from "./constants/ls-ogd-text";
import "./Home.css";
import LiveChart from "./LiveChart";
import fusion from "./assets/fusionControllerDiagram.png";

const Home: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <h1 className="demo-title mokoto-orange">
          LS-OGD
          <br />
          <span className="demo-title-detail">
            A Framework for Error-Bounded Multimodal Learning Under Concept
            Drift
          </span>
        </h1>
        <h2 className="demo-subtitle mokoto-orange">Introduction:</h2>
        <p className="demo-detail">{introText}</p>
        <h2 className="demo-subtitle mokoto-orange">System Design Overview:</h2>
        <img
          className="demo-design"
          src={fusion}
          alt="Fusion Controller Diagram"
        />
        <p className="demo-detail">{systemDesign}</p>
        <h2 className="demo-subtitle mokoto-orange">
          Model Performance in Real-Time:
        </h2>
        <p className="demo-detail live-text">{liveFig2}</p>
        <LiveChart width={500} height={300} />
        <br></br>
        <br></br>
        <p className="demo-detail live-text">{liveFig3}</p>
        <LiveChart width={500} height={300} />
        <h2 className="demo-subtitle mokoto-orange">Conclusion:</h2>
        <p className="demo-detail">{conclusion}</p>
      </div>
    </>
  );
};

export default Home;
