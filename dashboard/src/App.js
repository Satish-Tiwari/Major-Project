import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import AdminContext from "./Context/Admin/AdminContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AdminContext>
        <BrowserRouter>
          <ToastContainer/>
          <Admin />
        </BrowserRouter>
      </AdminContext>
    </>
  );
}

export default App;
