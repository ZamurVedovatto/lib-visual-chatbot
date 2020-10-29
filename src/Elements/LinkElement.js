import React from 'react';
import { nanoid } from 'nanoid';

const LinkElement = ({ mensagem }) => {
  return (
    <div style={styles}>
      <ul className="uk-list uk-list-bullet">
        {
          mensagem.content.map((content) => (
            <li key={nanoid()}><a href={content.value} target="_blank">{content.label}</a></li>
          ))
        }
      </ul>
    </div>
  )
}

export default LinkElement;

const styles = {
  display: "flex", flexDirection: "column", padding: ".5rem 0"
}