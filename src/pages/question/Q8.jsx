import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Q8.css";

const Q8 = () => {
  const questions = [
    "ช่วง 1 เดือนที่ผ่านมา คิดอยากตาย หรือคิดว่าตายไปจะดีกว่า",
    "ช่วง 1 เดือนที่ผ่านมา อยากทำร้ายตัวเอง หรือทำให้ตัวเองบาดเจ็บ",
    "ช่วง 1 เดือนที่ผ่านมา คิดเกี่ยวกับการฆ่าตัวตาย",
    "ท่านสามารถควบคุมความอยากฆ่าตัวตายที่ท่านคิดอยู่นั้นได้หรือไม่ หรือบอกได้ไหมว่าคงจะไม่ ทำตามความคิดนั้นในขณะนี้ได้",
    "ช่วง 1 เดือนที่ผ่านมา มีแผนการที่จะฆ่าตัวตาย",
    "ช่วง 1 เดือนที่ผ่านมา ได้เตรียมการที่จะ ทำร้ายตนเอง หรือเตรียมการจะฆ่าตัวตาย โดยตั้งใจว่าจะให้ตายจริงๆ",
    "ช่วง 1 เดือนที่ผ่านมา ได้ทำให้ตนเองบาดเจ็บ แต่ไม่ตั้งใจที่จะทำให้เสียชีวิต",
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
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate(); 

  const handleAnswer = (index, score) => {
    const updatedScores = [...scores];
    updatedScores[index] = score;
    setScores(updatedScores);

   
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
      setShowPopup(true); 
    } else if (totalScore <= 16) {
      setResult("มีแนวโน้มจะฆ่าตัวตายในปัจจุบันในระดับปานกลาง");
      setShowPopup(true); 
    } else {
      setResult("มีแนวโน้มจะฆ่าตัวตายในปัจจุบันในระดับรุนแรง");
      setShowPopup(true); 
    }

    sessionStorage.setItem("q8Answer", JSON.stringify(totalScore));
  };

  const closePopup = () => {
    setShowPopup(false); 
  };

  const handleNext = async() => {
    const token = sessionStorage.getItem("token");
    const q2Answers = sessionStorage.getItem("q2Answers");
    const q9Answers = sessionStorage.getItem("q9Answers");
    const q8Answers = sessionStorage.getItem("q8Answers");

    if (!token) {
      alert("No saved answers or token found. Please try again.");
      return;
    }

    const requestData = {
      token: token, 
      q2Answers: q2Answers || {}, 
      q9Answers: q9Answers || {}, 
      q8Answers: q8Answers || {}, 
    };

    try {
      // ส่งคำขอ POST ไปยัง API
      const response = await fetch("http://localhost:3000/api/questions/savequestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to save answers.");
      }
  
      console.log("Answers saved successfully:", data);
      
      navigate("/HomeLogin");
    } catch (error) {
      console.error("Error saving answers:", error.message);
    }
  };

  return (
    <div className="screening-container">
      {result === null ? (
        <div className="question-card">
          <div className="step-process">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`step-circle ${currentQuestionIndex === index ? "active" : currentQuestionIndex > index ? "completed" : ""}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <h1 className="title">แบบประเมินการฆ่าตัวตาย (8Q)</h1>
          <p className="question">ข้อ {currentQuestionIndex + 1} : {questions[currentQuestionIndex]}</p>
          <div className="answers-row">
            {scoring[currentQuestionIndex].map((score, scoreIndex) => (
              <button
                key={scoreIndex}
                onClick={() => handleAnswer(currentQuestionIndex, score)}
                className={`answer-Qustion ${scores[currentQuestionIndex] === score ? "selected" : ""}`}
              >
                {score === 0 ? "❌" : "✔"}
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
          <h1 className="title">สรุปผลการทดสอบ<br />แบบประเมินการฆ่าตัวตายด้วย 8 คำถาม (8Q)</h1>
          <p className="result">{result}</p>
          <button onClick={handleNext} className="next-Question">
            Next
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>ช่องทางปรึกษาจิตแพทย์</h2>
            <p>
              สายด่วนสุขภาพจิต: 1323 <br /><br />
              ติดต่อ: ภาควิชาจิตเวชศาสตร์ <br />
              ที่อยู่: ชั้น 3 อาคารสิรินธร โรงพยาบาลมหาวิทยาลัยนเรศวร มหาวิทยาลัยนเรศวร
              ตำบลท่าโพธิ์ อำเภอเมือง จังหวัดพิษณุโลก 65000. 
              คลินิกจิตเวช: 0-5596-5702-3 <br /><br />
              ศูนย์สุขภาวะนิสิต มหาวิทยาลัยนเรศวร
            </p>
            <button onClick={closePopup} className="close-popup">ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Q8;
