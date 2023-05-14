import { AiOutlineClose } from 'react-icons/ai';

import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { TextInput } from "../../atoms";
import { Button } from './../../atoms';

const TodoTile = ({className = '', ...props}) => {

  return (<>
    <div className={styles.TodoTile}>
      <Checkbox className={styles.Checkbox} />
      <TextInput
        {...props}
        className={styles.Input}
        type='text'
        spellCheck='false' />
      <Button
        className={styles.CloseButton}
        title={<AiOutlineClose className={styles.CloseIcon} />}></Button>
    </div> 
  </>)
};

export default TodoTile;
