import Checkbox from "../../atoms/Checkbox/Checkbox";
import styles from './TodoTile.module.scss';
import { TextInput } from "../../atoms";

const TodoTile = ({className = '', ...props}) => {

  return (<>
    <div className={styles.TodoTile}>
      <Checkbox className={styles.Checkbox} />
      <TextInput
        {...props}
        className={styles.Input}
        type='text'
        spellCheck='false' />
    </div> 
  </>)
};

export default TodoTile;
