import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Q9.css";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


const Q9 = () => {
  const [cookies] = useCookies(["token"]);
  const questions = [
    "รู้สึกเบื่อ ๆ หรือไม่ค่อยอยากทำอะไรเลย รู้สึกว่าอะไร ๆ ก็ไม่น่าสนใจ",
    "รู้สึกไม่ค่อยสบายใจ เศร้า หรือเหมือนใจมันเหนื่อย ๆ ท้อ ๆ บ้าง",
    "การพักผ่อนเป็นยังไงบ้าง มีอาการหลับยากหรือเปล่า ตื่นบ่อย หรือนอนเยอะกว่าปกติบ้างไหม",
    "รู้สึกเหนื่อยง่าย หรือเหมือนไม่ค่อยมีแรงจะทำอะไรบ้างไหม",
    "รู้สึกไม่อยากกินอะไรเลย หรือเผลอกินเยอะกว่าปกติบ้างไหม",
    "เคยรู้สึกไม่ดีกับตัวเองบ้างไหม แบบที่รู้สึกผิดหรือเหมือนทำให้ตัวเองหรือคนรอบข้างผิดหวัง",
    "มีช่วงที่รู้สึกว่าไม่สามารถจดจ่อกับอะไร อย่างดูทีวี ฟังเพลง หรือทำงานที่ต้องใช้สมาธิ",
    "รู้สึกว่าตัวเองทำอะไรช้าลงจนคนอื่นสังเกตเห็นได้หรือกระสับกระส่าย ไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
    "เคยมีความคิดแว้บเข้ามาว่าถ้าตัวเองหายไป หรือไม่ได้อยู่ตรงนี้แล้วมันอาจจะดีกว่า",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const handleAnswer = (score) => {
    const updatedScores = [...scores];
    updatedScores[currentQuestionIndex] = score;
    setScores(updatedScores);
  };

  useEffect(() => {
    if (scores[currentQuestionIndex] !== null && !isActive) {
      const timeout = setTimeout(() => {
        handleNext();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [scores, currentQuestionIndex]);


  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsActive(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(scores);
    }
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsActive(true);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  const calculateResult = (scores) => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);

    if (totalScore <= 6) {
      setResult("คุณไม่มีภาวะซึมเศร้า");
    } else if (totalScore <= 12) {
      setResult(
        <>
          คุณมีภาวะซึมเศร้าในระดับเล็กน้อย
          <br />
          มาประเมินต่อในแบบประเมินการฆ่าตัวตาย (8Q)
        </>
      );
    } else if (totalScore <= 18) {
      setResult(
        <>
          คุณมีภาวะซึมเศร้าในระดับปานกลาง
          <br />
          มาประเมินต่อในแบบประเมินการฆ่าตัวตาย (8Q)
        </>
      );
    } else {
      setResult(
        <>
          คุณมีภาวะซึมเศร้าในระดับที่รุนแรง
          <br />
          มาประเมินต่อในแบบประเมินการฆ่าตัวตาย (8Q)
        </>
      );
    }
    sessionStorage.setItem("q9Answer", JSON.stringify(totalScore));
  };

  const handleNextButton = async () => {
    if (result === "คุณไม่มีภาวะซึมเศร้า") {
      const token = cookies.token;
      const q2Answers = sessionStorage.getItem("q2Answer"); // จะต้องใส่ตัวเลข 0 1 
      const q9Answers = sessionStorage.getItem("q9Answer") || {};

      if (!token) {
        alert("No saved answers or token found. Please try again.");
        return;
      }

      const requestData = { Q2: q2Answers, Q9: q9Answers };

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
      } catch (error) {
        toast.error(`Error: ${error}`,
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
      }
    } else {
      navigate("/Q8");
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
          <h1 className="title">แบบคัดกรองโรคซึมเศร้า (9Q)</h1>
          <p className="question">
            ข้อ {currentQuestionIndex + 1} :
            ช่วงสองสัปดาห์ที่ผ่านมารวมถึงวันนี้ เคยรู้สึกแบบนี้บ่อยแค่ไหนบ้าง? <br /> "{questions[currentQuestionIndex]}"</p>
          <div className="answers-row">
            <div className="answer-column">
              <button
                onClick={() => handleAnswer(0)}
                className={`answer-Qustion ${scores[currentQuestionIndex] === 0 ? "selected" : ""}`}
              >
                😃
              </button>
              <p className="subtitle"> ไม่มีเลย </p>
            </div>
            <div className="answer-column">
              <button
                onClick={() => handleAnswer(1)}
                className={`answer-Qustion ${scores[currentQuestionIndex] === 1 ? "selected" : ""}`}
              >
                😐
              </button>
              <p className="subtitle"> เป็นบางวัน (1-7 วัน) </p>
            </div>
            <div className="answer-column">
              <button
                onClick={() => handleAnswer(2)}
                className={`answer-Qustion ${scores[currentQuestionIndex] === 2 ? "selected" : ""}`}
              >
                😞
              </button>
              <p className="subtitle"> เป็นบ่อย (มากกว่า 7 วัน) </p>
            </div>
            <div className="answer-column">
              <button
                onClick={() => handleAnswer(3)}
                className={`answer-Qustion ${scores[currentQuestionIndex] === 3 ? "selected" : ""}`}
              >
                😭
              </button>
              <p className="subtitle"> เป็นทุกวัน </p>
            </div>
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
          <h1 className="title">สรุปผลการทดสอบ <br /> แบบคัดกรองโรคซึมเศร้าด้วย 9 คำถาม (9Q) </h1>
          <p className="result">{result}</p>
          <button onClick={handleNextButton} className="next-Question">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Q9;
