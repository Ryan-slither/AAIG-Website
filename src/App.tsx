import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
//import Nav from "./Nav";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Nav /> */}
                <Home />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                {/* <Nav /> */}
                <div>
                  Looks like you have wandered to a page that does not exist
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
