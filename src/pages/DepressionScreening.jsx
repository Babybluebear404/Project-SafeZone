import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom"; 
import "./DepressionScreening.css";
=======
import { useNavigate } from "react-router-dom";
import "./DepressionScreening.css"; 
>>>>>>> 5b88830d80c699e99718548bed181ffd165f8fea

const DepressionScreening = () => {
  const [answers, setAnswers] = useState({ question1: null, question2: null });
  const [result, setResult] = useState(null);
<<<<<<< HEAD
  const navigate = useNavigate(); 
=======
  const navigate = useNavigate();
>>>>>>> 5b88830d80c699e99718548bed181ffd165f8fea

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
<<<<<<< HEAD
        {result === null ? (
          <>
            <h1 className="title">แบบคัดกรองโรคซึมเศร้าด้วย 2 คำถาม (2Q)</h1>
            <div className="mb-6">
              <p className="mb-4">
                ใน 2 สัปดาห์ที่ผ่านมา " ท่านรู้สึกหดหู่ เศร้าหรือสิ้นหวังหรือไม่? "
              </p>
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
              <p className="mb-4">
                ใน 2 สัปดาห์ที่ผ่านมา " ท่านรู้สึกเบื่อ ทำอะไร ๆ ก็ไม่เพลินหรือไม่? "
              </p>
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
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </>
        ) : (
          <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
            <h2 className="text-lg font-bold mb-2 text-center">สรุปผลการทดสอบ</h2>
            <p className="text-center">{result}</p>
            <button
              onClick={handleNext}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4"
            >
=======
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
>>>>>>> 5b88830d80c699e99718548bed181ffd165f8fea
              Next
            </button>
          </div>
        )}
      </div>
    
  );
};

export default DepressionScreening;
