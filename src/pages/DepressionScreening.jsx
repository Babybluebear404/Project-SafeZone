import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DepressionScreening.css"; 

const DepressionScreening = () => {
  const [answers, setAnswers] = useState({ question1: null, question2: null });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = () => {
    if (answers.question1 === "no" && answers.question2 === "no") {
      setResult("ปกติ ไม่เป็นโรคซึมเศร้า");
    } else {
      setResult(
        "เป็นผู้มีความเสี่ยง หรือมีแนวโน้มที่จะเป็นโรคซึมเศร้า ให้ประเมินต่อด้วยแบบประเมินโรคซึมเศร้าด้วย 9Q และแบบประเมินการฆ่าตัวตาย (8Q)"
      );
    }
  };

  const handleNext = () => {
    if (result === "ปกติ ไม่เป็นโรคซึมเศร้า") {
      navigate("/HomeLogin");
    } else {
      navigate("/Q9");
    }
  };

  return (
    
      <div className="signup-box">
        <h1 className="title">แบบคัดกรองโรคซึมเศร้าด้วย 2 คำถาม (2Q)</h1>

        
          <p className="question">ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ท่านมีอาการเหล่านี้บ่อยแค่ไหน<br /> "ท่านรู้สึกหดหู่ เศร้าหรือสิ้นหวังหรือไม่?"</p>
          <div className="answers-row">
            <button
              className={`answer-button ${answers.question1 === "yes" ? "selected" : ""}`}
              onClick={() => handleAnswerChange("question1", "yes")}
            >
              มี
            </button>
            <button
              className={`answer-button ${answers.question1 === "no" ? "selected" : ""}`}
              onClick={() => handleAnswerChange("question1", "no")}
            >
              ไม่มี
            </button>
          </div>
        

        
          <p className="question">ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ท่านมีอาการเหล่านี้บ่อยแค่ไหน <br />"ท่านรู้สึกเบื่อ ทำอะไร ๆ ก็ไม่เพลินหรือไม่?"</p>
          <div className="answers-row">
            <button
              className={`answer-button ${answers.question2 === "yes" ? "selected" : ""}`}
              onClick={() => handleAnswerChange("question2", "yes")}
            >
              มี
            </button>
            <button
              className={`answer-button ${answers.question2 === "no" ? "selected" : ""}`}
              onClick={() => handleAnswerChange("question2", "no")}
            >
              ไม่มี
            </button>
          </div>
        

        <button onClick={handleSubmit} className="nav-button submit">
          Submit
        </button>

        {result && (
          <div className="result-card">
            <h2 className="result-title">สรุปผลการทดสอบ</h2>
            <p className="result">{result}</p>
            <button onClick={handleNext} className="nav-button next">
              Next
            </button>
          </div>
        )}
      </div>
    
  );
};

export default DepressionScreening;
