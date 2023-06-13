import Header from "./components/Header";
import Todolist from "./components/Todolist";
import '../src/components/style.css'
import { QueryClientProvider, QueryClient } from "react-query";
import { Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Todolist/>}>
          </Route>
          <Route path=":id" element={<Edit/>}></Route>
        </Routes>
        
      </div>
    </QueryClientProvider>
  );
}

export default App;
