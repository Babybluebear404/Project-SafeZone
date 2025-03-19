import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // ใช้ react-cookie เพื่อตรวจสอบ cookie
import { useEffect } from "react";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]); // ดึง token จาก cookie

  useEffect(() => {
    if (!cookies.token) {  // ตรวจสอบว่าไม่มี token หรือไม่
      navigate("/login", { replace: true });  // ถ้าไม่มี token ให้ไปหน้า login
    }
  }, [cookies.token, navigate]);

  return cookies.token ? element : null;  // ถ้ามี token ก็แสดง element (หน้าที่ต้องการ)
};

export default PrivateRoute;
