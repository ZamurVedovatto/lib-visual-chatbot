import React from 'react';
import { nanoid } from 'nanoid';

const ButtonElement = ({ mensagem }) => {
  return (
    <div style={styles}>
      {
        mensagem.content.map((content) => (
          <a key={nanoid()} className="uk-button uk-button-default m-1">{content.label}</a>
        ))
      }
    </div>
  )
}

export default ButtonElement;

const styles = {
  display: "flex", flexDirection: "column", padding: ".5rem 0"
}