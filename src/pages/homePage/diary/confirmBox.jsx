import React, { useState } from 'react';
import "../../../style/ynPage.css";

export const YesNoPage = ({ datePick, question, onYes, onNo }) => {

  return (
    <div className='ynPage'>
      <div className='ynBox'>
        <p className='ynMessage'>{question}</p>
        <div className='ynButton'>
          <button className='onYes' onClick={onYes}>ใช่</button>
          <button className='onNo' onClick={onNo}>ยกเลิก</button>
        </div>
      </div>
    </div>
  )

}