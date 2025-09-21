import React from "react";
import Routes from "./pages/Routes";
import ScreenLoader from "./components/ScreenLoader";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? <ScreenLoader /> : <Routes />}
    </>
  );
}

export default App;
