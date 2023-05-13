import styles from './Header.module.scss';
import { TodoTile } from '../../molecules';

const Header = () => {
  return (<header className={styles.Header}><TodoTile /></header>)
};

export default Header;
