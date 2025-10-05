import "./Home.css";
import LiveChart from "./LiveChart";

const Home: React.FC = () => {
  return (
    <>
      <h1 className="demo-title mokoto-orange">aaig demos</h1>
      <div className="home-container">
        <LiveChart />
      </div>
    </>
  );
};

export default Home;
