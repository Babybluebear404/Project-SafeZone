import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Q8.css";

const Q8 = () => {
  const questions = [
    "ช่วง 1 เดือนที่ผ่านมา คิดอยากตาย หรือคิดว่าตายไปจะดีกว่า",
    "ช่วง 1 เดือนที่ผ่านมา อยากท าร้ายตัวเอง หรือท าให้ตัวเองบาดเจ็บ",
    "ช่วง 1 เดือนที่ผ่านมา คิดเกี่ยวกับการฆ่าตัวตาย",
    "ท่านสามารถควบคุมความอยากฆ่าตัวตายที่ท่านคิดอยู่นั้นได้หรือไม่ หรือบอกได้ไหมว่าคงจะไม่ท าตามความคิดนั้นในขณะนี้ได้",
    "ช่วง 1 เดือนที่ผ่านมา มีแผนการที่จะฆ่าตัวตาย",
    "ช่วง 1 เดือนที่ผ่านมา ได้เตรียมการที่จะท าร้ายตนเอง หรือเตรียมการจะฆ่าตัวตาย โดยตั้งใจว่าจะให้ตายจริงๆ",
    "ช่วง 1 เดือนที่ผ่านมา ได้ท าให้ตนเองบาดเจ็บ แต่ไม่ตั้งใจที่จะท าให้เสียชีวิต",
    "ช่วง 1 เดือนที่ผ่านมา ได้พยายามฆ่าตัวตาย โดยคาดหวัง/ตั้งใจที่จะให้ตาย",
    "ตลอดชีวิตที่ผ่านมา ท่านเคยพยายามฆ่าตัวตาย"
  ];

  const scoring = [
    [0, 1], // คิดอยากตาย หรือคิดว่าตายไปจะดีกว่า
    [0, 2], // อยากทำร้ายตัวเอง หรือทำให้ตัวเองบาดเจ็บ
    [0, 6], // คิดเกี่ยวกับการฆ่าตัวตาย
    [0, 8], // ควบคุมความอยากฆ่าตัวตายได้หรือไม่
    [0, 8], // มีแผนการที่จะฆ่าตัวตาย
    [0, 9], // เตรียมการจะฆ่าตัวตาย
    [0, 4], // ได้ทำให้ตัวเองบาดเจ็บ
    [0, 10], // พยายามฆ่าตัวตาย
    [0, 4] // เคยพยายามฆ่าตัวตาย
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อทำการเปลี่ยนหน้า

  const handleAnswer = (index, score) => {
    const updatedScores = [...scores];
    updatedScores[index] = score;
    setScores(updatedScores);

    // คำนวณผลเมื่อผู้ใช้ตอบคำถามเสร็จ
    if (index < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(updatedScores);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = (scores) => {
    const totalScore = scores.reduce((sum, score) => sum + (score || 0), 0);

    if (totalScore === 0) {
      setResult("ไม่มีแนวโน้มจะฆ่าตัวตายในปัจจุบัน");
    } else if (totalScore <= 8) {
      setResult("มีแนวโน้มจะฆ่าตัวตายในปัจจุบันในระดับน้อย");
    } else if (totalScore <= 16) {
      setResult("มีแนวโน้มจะฆ่าตัวตายในปัจจุบันในระดับปานกลาง");
    } else {
      setResult("มีแนวโน้มจะฆ่าตัวตายในปัจจุบันในระดับรุนแรง");
    }
  };

  const handleNext = () => {
    // ตรวจสอบผลและนำทางไปหน้า HomeLogin หรือ Psychiatrist
    if (result === "ไม่มีแนวโน้มจะฆ่าตัวตายในปัจจุบัน") {
      navigate("/HomeLogin");
    } else {
      navigate("/Psychiatrist");
    }
  };

  return (
    <div className="screening-container">
      {result === null ? (
        <div className="question-card">
          <h1 className="title">แบบประเมินการฆ่าตัวตาย (8Q)</h1>
          <p className="question">{questions[currentQuestionIndex]}</p>
          <div className="answers-row">
            {scoring[currentQuestionIndex].map((score, scoreIndex) => (
              <button
                key={scoreIndex}
                onClick={() => handleAnswer(currentQuestionIndex, score)}
                className={`answer-button ${scores[currentQuestionIndex] === score ? "selected" : ""}`}
              >
                {score === 0 ? "ไม่มี" : "มี"}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="nav-button back"
              >
                Back
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h1 className="title">สรุปผลการทดสอบ</h1>
          <p className="result">{result}</p>
          <button onClick={handleNext} className="nav-button next">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Q8;
