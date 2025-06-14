import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/DepressionScreening.css";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


const DepressionScreening = () => {
  const [answers, setAnswers] = useState({ question1: null, question2: null });
  const [result, setResult] = useState(null);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  let totalScore = 0;

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = () => {
    if (answers.question1 === "yes") {totalScore +=1; }
    if (answers.question2 === "yes") {totalScore +=1; }

    if (totalScore >= 1){
      setResult(
        "คุณเป็นผู้มีความเสี่ยงหรือมีแนวโน้มที่จะเป็นโรคซึมเศร้า มาประเมินต่อด้วยแบบประเมินโรคซึมเศร้าด้วย 9Q "
      );
    } else {
      setResult("สุขภาพใจของคุณปกติ ✨");
    }
    
    sessionStorage.setItem("q2Answer", JSON.stringify(1));// ต้องการเก็บ 0 1

  };

  const handleNext = async () => {
    if (answers.question1 === "yes" || answers.question2 === "yes") {
      navigate("/Q9");
    } else {
      const token = cookies.token;

      if (!token) {
        alert("No saved answers or token found. Please try again.");
        return;
      }

      const requestData = { Q2: 0}
      try {
        const response = await fetch("https://project-safezone.onrender.com/api/questions/savequestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          toast.success("Your depression screening results have been saved.",
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.error}`,
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
        navigate("/HomeLogin");
      }   catch (error) {
        toast.error(`Error: ${error}`,
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
      }
    }
  };

  const isFormComplete = answers.question1 !== null && answers.question2 !== null;

  return (
    <div className="screeningCase">
      {result === null ? (
        <>
          <h1 className="title">แบบคัดกรองโรคซึมเศร้าด้วย 2 คำถาม (2Q)</h1>

          <div>
            <p className="questionlist">💕 ช่วง 2 สัปดาห์ที่ผ่านมา มีช่วงไหนที่รู้สึกเศร้า หดหู่ หรือเหมือนไม่ค่อยมีพลังใจบ้างไหม?</p>
            <div>
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="yes"
                  onChange={() => handleAnswerChange("question1", "yes")}
                />
                <span className="yN">มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="no"
                  onChange={() => handleAnswerChange("question1", "no")}
                />
                <span className="yN">ไม่มี</span>
              </label>
            </div>
          </div>

          <div>
            <p className="questionlist"> 💕ช่วง 2 สัปดาห์ที่ผ่านมา มีความรู้สึกเบื่อ ๆ หรือทำอะไรก็ไม่ค่อยรู้สึกสนุกเหมือนเดิมบ้างไหม?</p>
            <div>
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="yes"
                  onChange={() => handleAnswerChange("question2", "yes")}
                />
                <span className="yN">มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="no"
                  onChange={() => handleAnswerChange("question2", "no")}
                />
                <span className="yN">ไม่มี</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormComplete}
            className={`submit-Question ${isFormComplete ? "active" : "disabled"}`}
          >
            Submit
          </button>
        </>
      ) : (
        <div>
          <h1 >สรุปผลการทดสอบ</h1>
          <p className="questionlist">{result}</p>
          <button onClick={handleNext} className="next-Question">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DepressionScreening;
