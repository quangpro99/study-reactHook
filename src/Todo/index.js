import { useRef, useReducer, useState, createContext, useContext } from "react";
import reducer, { initState } from "./reducer";
import { setJob, addJob, deleteJob } from "./actions";
import logger from "./logger";
import Context from "../Context";
import { ThemeContext } from "./ThemeContext";
//Dừng ở file chưa là file index tổng src
// import { ThemeProvider } from "./ThemeContext";

function useReducerApp2() {
  //Init state

  //Action

  //Reducer

  const [state, dispatch] = useReducer(logger(reducer), initState);

  const { job, jobs } = state;

  const inputRef = useRef();

  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h3>Todo</h3>
      <input
        ref={inputRef}
        value={job}
        placeholder="Enter todo"
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <span onClick={() => dispatch(deleteJob(index))}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

//Context
//CompA => CompB => CompC(Thông thường truyền dữ liệu thông qua component trung gian tức thông qua props nhưng với context thì có thể truyền trực tiếp không qua trung gian)
//Theme: Dark/ Light
//Component giữa chỉ đóng vai trò trung gian giữ giá trị chứ không cần dùng nên ms cần useContext

//Context
//1.create context(một phạm vi giúp truyền dữ liệu trong phạm vi đó)
//2.Provider : thằng cung cấp(là react component)
//3.Consumer: thằng nhận dữ liệu(là react component)

function useContextApp() {
  const theme = useContext(ThemeContext);
  return (
    //Tất cả childe của provider đều có thể nhận dc giá trị theme, nhận giá trị dùng consumer từ thằng con
    // <ThemeProvider>
    <div style={{ padding: 20 }}>
      <button onClick={theme.toogleTheme}>Toogle theme</button>
      <Context />
    </div>
    // </ThemeProvider>
  );
}

export default useContextApp;
