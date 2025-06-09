import React, { useState } from 'react';

const YesNoPage = () => {
  const [answer, setAnswer] = useState(null);

  const handleClick = (response) => {
    setAnswer(response);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>คุณต้องการดำเนินการต่อหรือไม่?</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.yesButton} onClick={() => handleClick('Yes')}>
          Yes
        </button>
        <button style={styles.noButton} onClick={() => handleClick('No')}>
          No
        </button>
      </div>
      {answer && (
        <p style={styles.result}>
          คุณเลือก: <strong>{answer}</strong>
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  yesButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  noButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  result: {
    marginTop: '30px',
    fontSize: '18px',
    color: '#333',
  },
};

export default YesNoPage;
