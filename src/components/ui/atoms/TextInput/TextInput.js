import './TextInput.module.scss';

const TextInput = (props) => {
  return (<input {...props} type="text" spellCheck='false' />);
};

export default TextInput;
