import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { Button, TextInput } from './../../atoms';

const TodoTile = ({className = '', id, value, onAddTodo, onRemoveTodo, onToggleTodo, checked, ...props}) => {
  const [initialValue] = useState(value);
  const textInputClasses = classNames(styles.Input, { [styles.CrossedInput]: checked });
  const closeButtonClasses = classNames(styles.CloseButton, { [styles.Hidden]: !initialValue });
  const checkboxDisabled = !initialValue ? true : false;
  const hasInitialValue = !!initialValue;
  
  return (<>
    <div id={id} className={classNames(styles.TodoTile, className)}>
      <Checkbox
        id={`${id}-checkbox`}
        className={styles.Checkbox}
        checked={checked}
        disabled={checkboxDisabled}
        onChange={onToggleTodo} />
      {hasInitialValue
        ? <span className={styles.InitialValueContainer}>{initialValue}</span>
        : <TextInput
            {...props}
            className={textInputClasses}
            onKeyDown={onAddTodo}
            value={value}
            type='text'
            spellCheck='false' />
      }
      <Button
        className={closeButtonClasses}
        title={<AiOutlineClose className={styles.CloseIcon} />}
        onClick={onRemoveTodo}></Button>
    </div> 
  </>)
};

export default TodoTile;
