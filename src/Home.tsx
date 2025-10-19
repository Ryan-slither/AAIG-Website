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
import metrics from "./constants/metrics_json_20251019_001439.json";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const steps = metrics.phase2_adapt_ctamd.step;
const driftSignal = metrics.phase2_adapt_ctamd.drift_signal;
const errorSignal = metrics.phase2_adapt_ctamd.error_signal;
const learningRate = metrics.phase2_adapt_ctamd.lr;
const fusionAlpha = metrics.phase2_adapt_ctamd.fusion_alpha;

const firstFigureData = steps.map((_, idx) => ({
  x: steps[idx],
  y1: errorSignal[idx],
  y2: driftSignal[idx],
}));

const secondFigureData = steps.map((_, idx) => ({
  x: steps[idx],
  y1: fusionAlpha[idx],
  y2: learningRate[idx],
}));

const Home: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

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
        <div className="play-container">
          <h2 className="demo-subtitle mokoto-orange">
            Model Performance in Real-Time:
          </h2>
          <div
            className="play-button"
            onClick={() => setStarted((prev) => !prev)}
          >
            {started ? (
              <FaPause size={25} color="white" />
            ) : (
              <FaPlay size={25} color="white" />
            )}
          </div>
        </div>
        <p className="demo-detail live-text">{liveFig2}</p>
        <LiveChart
          width={isMobile ? 370 : 800}
          height={isMobile ? 240 : 400}
          data={firstFigureData}
          xName="Steps"
          y1Name="Error Signal"
          y1Color="purple"
          y1range={[-0.05, 1.05]}
          y2Name="Drift Signal Estimation"
          y2Color="maroon"
          y2range={[-0.05, 4.05]}
          chartName="LS_OGD Error Signal & Drift Estimation"
          started={started}
        />
        <br></br>
        <br></br>
        <p className="demo-detail live-text">{liveFig3}</p>
        <LiveChart
          width={isMobile ? 370 : 800}
          height={isMobile ? 240 : 400}
          data={secondFigureData}
          xName="Steps"
          y1Name="Fusion Alpha"
          y1Color="orange"
          y1range={[-0.05, 1.05]}
          y2Name="Learning Rate"
          y2Color="#ADD8E6"
          y2range={[1e-6, 1e-3]}
          chartName="Adaptation Signals"
          started={started}
        />
        <h2 className="demo-subtitle mokoto-orange">Conclusion:</h2>
        <p className="demo-detail">{conclusion}</p>
      </div>
    </>
  );
};

export default Home;
