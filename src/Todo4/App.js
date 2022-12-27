import Heading from "./components/Heading/";
import Paragraph from "./components/Paragraph/";
import GlobalStyles from "./components/GlobalStyles";

function App() {
  return (
    <GlobalStyles>
      <div>
        <Heading primary/>
        <Paragraph primary disable/>

      </div>
      <div className="d-flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </GlobalStyles>
  );
}

export default App;

// Development: npm start / yarn start -> CSS internal

//Production: npm run build / yarn build -> CSS external

//Tránh phụ thuộc CSS
//CSS module
//Styled component
