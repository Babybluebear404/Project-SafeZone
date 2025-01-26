import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="text-container">
        <h1 className="main-title">SAFE ZONE</h1>
        <p className="subtitle">
          เพื่อเคียงข้างกายในวันที่คุณอยากคุยกับใครสักคน
          <br />
          และเราสามารถช่วยคุณในการประเมินระดับโรคซึมเศร้า
        </p>
        <button onClick={() => navigate("/login")} className="btn-login">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Home;
