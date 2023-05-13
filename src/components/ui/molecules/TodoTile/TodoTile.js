import { useState } from "react";

import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { TextInput } from "../../atoms";

const TodoTile = ({ content }) => {
  const [text, setText] = useState('');

  return (<>
    <div className={styles.TodoTile}>
      <Checkbox />
      {content
        ? content
        : <TextInput type='text'
            spellCheck='false'
            value={text}
            onChange={(e) => {setText(e.target.value)}} />
      }
    </div> 
  </>)
};

export default TodoTile;
