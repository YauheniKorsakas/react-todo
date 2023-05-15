import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { useMemo, useState } from 'react';

import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { Button } from './../../atoms';
import { TextInput } from "../../atoms";

const TodoTile = ({className = '', id, value, ...props}) => {
  const [checked, setChecked] = useState(false);
  const textInputClasses = useMemo(() => classNames(styles.Input, { [styles.CrossedInput]: checked }), [checked]);
  const closeButtonClasses = useMemo(() => classNames(styles.CloseButton, { [styles.Hidden]: !value }), []);
  const checkboxDisabled = useMemo(() => !value ? true : false, []);

  return (<>
    <div id={id} className={classNames(styles.TodoTile, className)}>
      <Checkbox
        id={`${id}-checkbox`}
        className={styles.Checkbox}
        checked={checked}
        disabled={checkboxDisabled}
        onClick={() => {setChecked(!checked)}}/>
      <TextInput
        {...props}
        className={textInputClasses}
        value={value}
        type='text'
        spellCheck='false' />
      <Button
        className={closeButtonClasses}
        title={<AiOutlineClose className={styles.CloseIcon} />}></Button>
    </div> 
  </>)
};

export default TodoTile;
