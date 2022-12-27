import { useRef, useReducer, useState, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({children}) {
  const [theme, setTheme] = useState("dark");

  const toogleTheme = () => {
    //Nếu theme đang là dark thì đổi thành light, và nếu không phải light thì để thành dark
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const value ={
    theme,
    toogleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider };
