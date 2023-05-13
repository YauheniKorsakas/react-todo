import './TextInput.module.scss';

const TextInput = (props) => {
  return (<input {...props} spellCheck='false' />);
};

export default TextInput;
