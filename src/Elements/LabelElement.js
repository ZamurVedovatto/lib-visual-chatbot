import React from 'react';

const LabelElement = ({ mensagem }) => {
  return (
    <div style={styles}>
      <span>{mensagem}</span>
    </div>
  )
}

export default LabelElement;

const styles = {
  display: "flex", flexDirection: "column", padding: ".5rem 0"
}