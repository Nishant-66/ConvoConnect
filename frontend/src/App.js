// import { Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/chat' element={<ChatPage/>} />
      </Routes>

    </>
     
  );
}

export default App;
