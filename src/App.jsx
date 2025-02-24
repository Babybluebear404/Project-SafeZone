import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import router from './router';

function App() {
  return <RouterProvider router={router} />;

}

export default App;
