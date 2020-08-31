import React from 'react';
import './style/Label.css';


function Labels({ labels=[] }) {
  return (
    <>
      {
        labels.map((value, i) => (
          <div className="label" key={i}>{value}</div>
        ))
      }
    </>
  );
}

export default Labels;
