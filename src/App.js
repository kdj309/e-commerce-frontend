import React,{useEffect} from "react";
import Routes from "./Routes";
import "./styles.css";
import { useDispatch } from "react-redux";
import { getproducts } from "./store/productslice";
import { getCategories, getSizeOptions } from "./store/filterslice";
function App() {
  const dispatcher=useDispatch();
  useEffect(() => {
    dispatcher(getproducts());
    dispatcher(getSizeOptions());
    dispatcher(getCategories())
  }, [])
  
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
