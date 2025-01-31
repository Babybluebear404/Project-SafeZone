import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Q9.css";

const Q9 = () => {
  const questions = [
    "เบื่อ ไม่สนใจทำอะไร",
    "ไม่สบายใจ ซึมเศร้า ท้อแท้",
    "หลับยากหรือหลับๆ ตื่นๆ หรือหลับมากไป",
    "เหนื่อยง่ายหรือไม่ค่อยมีแรง",
    "เบื่ออาหาร หรือกินมากเกินไป",
    "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตนเองหรือครอบครัวผิดหวัง",
    "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
    "พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
    "คิดทำร้ายตนเองหรือคิดว่าถ้าตายไปคงจะดี",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const handleAnswer = (score) => {
    const updatedScores = [...scores];
    updatedScores[currentQuestionIndex] = score;
    setScores(updatedScores);
  };

  useEffect(() => {
    if (scores[currentQuestionIndex] !== null) {
      const timeout = setTimeout(() => {
        handleNext();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [scores, currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(scores);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = (scores) => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);

    if (totalScore <= 6) {
      setResult("ไม่มีภาวะซึมเศร้า");
    } else if (totalScore <= 12) {
      setResult("มีภาวะซึมเศร้าระดับน้อย");
    } else if (totalScore <= 18) {
      setResult("มีภาวะซึมเศร้าระดับปานกลาง");
    } else {
      setResult("มีภาวะซึมเศร้าระดับรุนแรง");
    }
  };

  const handleNextButton = () => {
    if (result === "ไม่มีภาวะซึมเศร้า") {
      navigate("/HomeLogin"); 
    } else {
      navigate("/Q8"); 
    }
  };

  return (
    <div className="screening-container">
      {result === null ? (
        <div className="question-card">
          <h1 className="title">แบบคัดกรองโรคซึมเศร้า (9Q)</h1>
          <p className="question">
            ข้อ {currentQuestionIndex + 1} :
            ใน 2 สัปดาห์ที่ผ่านมา "{questions[currentQuestionIndex]}"</p>
          <div className="answers-row">
            <button
              onClick={() => handleAnswer(0)}
              className={`answer-button ${scores[currentQuestionIndex] === 0 ? "selected" : ""}`}
            >
              😃
            </button>
            <p className="subtitle"> ไม่มีเลย  </p>
            <button
              onClick={() => handleAnswer(1)}
              className={`answer-button ${scores[currentQuestionIndex] === 1 ? "selected" : ""}`}
            >
              😐
            </button>
            <p className="subtitle"> เป็นบางวัน (1-7 วัน)  </p>
            <button
              onClick={() => handleAnswer(2)}
              className={`answer-button ${scores[currentQuestionIndex] === 2 ? "selected" : ""}`}
            >
              😞
            </button>
            <p className="subtitle"> เป็นบ่อย (มากกว่า 7 วัน)  </p>
            <button
              onClick={() => handleAnswer(3)}
              className={`answer-button ${scores[currentQuestionIndex] === 3 ? "selected" : ""}`}
            >
              😭
            </button>
            <p className="subtitle"> เป็นทุกวัน  </p>
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="nav-button back"
              >
                Back
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h1 className="title">สรุปผลการทดสอบ <br />แบบคัดกรองโรคซึมเศร้าด้วย 9 คำถาม (9Q)</h1>
          <p className="result">{result}</p>
          <button onClick={handleNextButton} className="nav-button next">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Q9;
