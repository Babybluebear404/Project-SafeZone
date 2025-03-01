import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Tab from "./pages/Tab"; 
import router from './router';

function App() {
  return (
    <>
      <Tab />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
