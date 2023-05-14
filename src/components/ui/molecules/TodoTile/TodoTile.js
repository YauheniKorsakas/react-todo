import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames';

import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { TextInput } from "../../atoms";
import { Button } from './../../atoms';

const TodoTile = ({className = '', value, ...props}) => {

  return (<>
    <div className={classNames(styles.TodoTile, className)}>
      <Checkbox className={styles.Checkbox} />
      <TextInput
        {...props}
        type='text'
        className={styles.Input}
        value={value}
        spellCheck='false' />
      <Button
        className={styles.CloseButton}
        title={<AiOutlineClose className={styles.CloseIcon} />}></Button>
    </div> 
  </>)
};

export default TodoTile;
