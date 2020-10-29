import React from 'react';
import { nanoid } from 'nanoid';

const ListElement = ({ mensagem }) => {
  return (
    <div style={styles}>
      <ul className="uk-list uk-list-divider">
        {
          mensagem.content.map((content) => (
            <li key={nanoid()}>{content.label}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default ListElement;

const styles = {
  display: "flex", flexDirection: "column", padding: ".5rem 0"
}