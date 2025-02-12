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
    if (answers.question1 === "yes" || answers.question2 === "yes") {
      setResult(
        "เป็นผู้มีความเสี่ยง หรือมีแนวโน้มที่จะเป็นโรคซึมเศร้า ให้ประเมินต่อด้วยแบบประเมินโรคซึมเศร้าด้วย 9Q และแบบประเมินการฆ่าตัวตาย (8Q)"
      );
    } else {
      setResult("ปกติ ไม่เป็นโรคซึมเศร้า");
    }
  };

  const handleNext = () => {
    if (result === "ปกติ ไม่เป็นโรคซึมเศร้า") {
      navigate("/HomeLogin");
    } else {
      navigate("/Q9");
    }
  };

  const isFormComplete = answers.question1 !== null && answers.question2 !== null;

  return (
    <div className="signup-box">
      {result === null ? (
        <>
          <h1 className="title">แบบคัดกรองโรคซึมเศร้าด้วย 2 คำถาม (2Q)</h1>

          <div className="mb-6">
            <p className="mb-4">ใน 2 สัปดาห์ที่ผ่านมา " ท่านรู้สึกหดหู่ เศร้าหรือสิ้นหวังหรือไม่? "</p>
            <div className="flex gap-4">
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

          <div className="mb-6">
            <p className="mb-4">ใน 2 สัปดาห์ที่ผ่านมา " ท่านรู้สึกเบื่อ ทำอะไร ๆ ก็ไม่เพลินหรือไม่? "</p>
            <div className="flex gap-4">
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
            className={`submit-btn ${isFormComplete ? "active" : "disabled"}`}
          >
            Submit
          </button>
        </>
      ) : (
        <div>
          <h2>สรุปผลการทดสอบ</h2>
          <p className="text-center">{result}</p>
          <button onClick={handleNext} className="next-btn">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DepressionScreening;
