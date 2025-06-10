import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Q8.css";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


const Q8 = () => {
  const [cookies] = useCookies(["token"]);
  const questions = [
    "ในช่วง 1 เดือนที่ผ่านมา มีบางช่วงไหม ที่รู้สึกว่า ถ้าหายไป หรือไม่ต้องอยู่ตรงนี้แล้ว อาจจะดีกว่า",
    "ในช่วง 1 เดือนที่ผ่านมา มีบางครั้งไหม ที่รู้สึกอยากทำร้ายตัวเอง หรือรู้สึกว่าการเจ็บกายจะทำให้ใจสบายขึ้นบ้าง",
    "ในช่วง 1 เดือนที่ผ่านมา เคยมีช่วงที่คิดถึงเรื่องการจากไป หรือความคิดแบบนั้นแวะเข้ามาในใจไหม",
    "ตอนนี้ คุณคิดว่าคุณพอจะควบคุมความคิดแบบนั้นได้ไหม หรือรู้สึกมั่นใจว่าคงจะไม่ลงมือทำอะไรตามความคิดนั้นในตอนนี้?",
    "ในช่วง 1 เดือนที่ผ่านมา เคยคิดวางแผน หรือลองคิดไว้จริงจังว่าจะจากไปอย่างไรบ้างไหม",
    "ในช่วง 1 เดือนที่ผ่านมา มีช่วงที่ได้เริ่มเตรียมอะไรบางอย่างไว้ เพื่อทำร้ายตัวเองหรือจากไปอย่างตั้งใจบ้างไหม",
    "ในช่วง 1 เดือนที่ผ่านมา มีบางช่วงที่อาจเผลอทำร้ายตัวเองบ้างไหม แม้จะไม่ได้ตั้งใจให้ถึงกับหายไปก็ตาม",
    "ในช่วง 1 เดือนที่ผ่านมา มีเหตุการณ์ไหนที่ได้ลองพยายามทำอะไรบางอย่าง เพื่อตั้งใจจะจากไปจริง ๆ บ้างไหม",
    "ตั้งแต่อดีตจนถึงตอนนี้ เคยมีช่วงหนึ่งไหม ที่เคยพยายามจะจากไปจริง ๆ"
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

  const handleNext = async () => {
    const token = cookies.token;
    const q2Answers = sessionStorage.getItem("q2Answer"); // จะต้องใส่ตัวเลข 0 1 
    const q9Answers = sessionStorage.getItem("q9Answer") || {};
    const q8Answers = sessionStorage.getItem("q8Answer") || {};

    if (!token) {
      alert("No saved answers or token found. Please try again.");
      return;
    }

    const requestData = { Q2: q2Answers, Q9: q9Answers, Q8: q8Answers };
    
    try {
      const response = await fetch("http://localhost:3000/api/questions/savequestion", {
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
