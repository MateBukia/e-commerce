import React from 'react';
import './defaultButton1.css';

interface DefaultButton1Props {
  onClick: () => void;
}

const DefaultButton1: React.FC<DefaultButton1Props> = ({ onClick }) => {
  return (
    <button className="Default-Button1" onClick={onClick}>
      SEE PRODUCT
    </button>
  );
};

export default DefaultButton1;
