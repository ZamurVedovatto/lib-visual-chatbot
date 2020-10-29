import React from 'react';
import { nanoid } from 'nanoid';

const SelectElement = ({ mensagem }) => {
  return (
    <div style={styles}>
      <select className="uk-select">
        {
          mensagem.content.map((content) => (
            <option key={nanoid()} value={content.value}>{content.label}</option>
          ))
        }
      </select>
      <button className="uk-button uk-button-default uk-button-small mt-2">Confirmar</button>
    </div>
  )
}

export default SelectElement;

const styles = {
  display: "flex", flexDirection: "column", padding: ".5rem 0" 
}