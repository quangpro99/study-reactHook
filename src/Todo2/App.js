import { useContext } from "react";
import { StoreContext } from "./index";
import { useStore, actions } from "./";

function App() {
  const [state, dispatch] = useStore();

  const { todos, todoInput } = state;

  console.log(state);
  console.log('TodoInput :',todoInput);

  const handleAdd = ()=>{
    dispatch(actions.addTodo(todoInput))
  }

  console.log(todos)

   return (
    <div>
      <input
        value={todoInput}
        placeholder="Enter todo"
        onChange={(e) => {
          dispatch(actions.setTodoInput(e.target.value));
        }}
      />
      <button onClick={handleAdd}>Add</button>
      {todos.map((todo, index) =>(
        <li key={index}>{todo}</li>
      ))}
    </div>
  );
}

export default App;
