import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Q8.css";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


const Q8 = () => {
  const [cookies] = useCookies(["token"]);
  const questions = [
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยรู้สึกว่าถ้าหายไปหรือไม่ต้องอยู่ตรงนี้แล้ว อาจจะดีกว่า",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยรู้สึกหรือทำให้ตัวเองบาดเจ็บ",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยมีความคิดเกี่ยวกับการจากไปของตัวเอง",
    "คุณสามารถควบคุมความคิดเกี่ยวกับการจากไปของตัวเองได้หรือไม่ หรือบอกได้ไหมว่าคุณจะไม่ทำตามความคิดนั้น",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยมีความคิดเกี่ยวกับแผนการการจากไปของตัวเอง",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ มีช่วงที่ได้เริ่มเตรียมอะไรบางอย่างไว้ เพื่อทำร้ายตัวเองหรือจากไปอย่างตั้งใจบ้างไหม",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยได้ทำให้ตัวเองบาดเจ็บแต่ไม่ได้ตั้งใจที่จะทำให้ถึงกับตัวเองต้องจากไป",
    "ในช่วง 1 เดือนที่ผ่านมารวมถึงจนถึงวันนี้ เคยได้พยายามทำร้ายตัวเองโดยตั้งใจที่ทำให้ตัวเองจากไป",
    "ตลอดระยะเวลาที่ผ่านมาจนถึงวันนี้ เคยพยายามทำให้ตัวเองจากไปจริง ๆ บ้างไหม"
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

    // ถ้าเป็นข้อ 3 (index === 2)
    if (index === 2) {
      if (score === 0) {
        // ข้าม 3.1 แล้วไปข้อ 4 (index 4)
        setCurrentQuestionIndex(4);
      } else {
        // ไปที่ 3.1 (index 3)
        setCurrentQuestionIndex(3);
      }
    }
    else if (index === 3 && scores[2] !== 0) {
      // หลังจาก 3.1 ไปที่ข้อ 4 (index 4)
      setCurrentQuestionIndex(4);
    }
    else if (index < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else {
      calculateResult(updatedScores);
    }
  };


  const handleBack = () => {
    if (currentQuestionIndex === 4) {
      // ถ้าย้อนกลับจากข้อ 4
      if (scores[2] === 0) {
        // ข้ามข้อ 3.1 → ย้อนกลับไปข้อ 3
        setCurrentQuestionIndex(2);
      } else {
        // เคยตอบข้อ 3 ว่า "ใช่" → แสดง 3.1 → ย้อนกลับไป 3.1
        setCurrentQuestionIndex(3);
      }
    } else if (currentQuestionIndex === 3) {
      // กรณีอยู่ที่ข้อ 3.1 แล้วกด Back → ย้อนกลับไปข้อ 3
      setCurrentQuestionIndex(2);
    } else if (currentQuestionIndex > 0) {
      // ข้ออื่นๆ ทั่วไป
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
    } catch (error) {
      toast.error(`Error: ${error}`,
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
    }
  };

  const getQuestionNumber = (index) => {
    if (index === 3) return "3.1"; // ข้อพิเศษ 3.1
    if (index > 3) return index;   // หลังจาก 3.1 → ข้อ 4, 5, 6, ...
    return index + 1;              // ข้อ 1–3
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
                {index === 3 ? "3.1" : index > 3 ? index : index + 1}
              </div>
            ))}
          </div>
          <h1 className="title">แบบประเมินการฆ่าตัวตาย (8Q)</h1>
          <p className="question">
            ข้อ {getQuestionNumber(currentQuestionIndex)} : {questions[currentQuestionIndex]}
          </p>
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
          <h1 className="title">สรุปผลการทดสอบ <br /> แบบประเมินการฆ่าตัวตายด้วย 8 คำถาม (8Q) </h1>
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
