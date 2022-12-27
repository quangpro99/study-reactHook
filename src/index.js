import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./Todo/ThemeContext";
import { StoreProvider } from "./Todo2";

console.log(React);
//Fake comments
function emitComment(id) {
  setInterval(() => {
    //Phát event trong DOm tương tự DOM phát ra event, bất kỳ file nào đều có thể nghe dc vì đang phát ở đối tượng là window
    window.dispatchEvent(
      //Chuyển kênh theo id
      new CustomEvent(`lesson-${id}`, {
        detail: `Nội dung comment của lesson ${id}`,
      })
    );
  }, 2000);
}

emitComment(1);
emitComment(2);
emitComment(3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    {/* <StoreProvider> */}
    {/* 1 trang web chỉ có 1 bộ định tuyến router */}
    <Router>
      <App />
    </Router>
    {/* </StoreProvider> */}
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
