import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import router from "./router";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </CookiesProvider>
  );
}

export default App;
