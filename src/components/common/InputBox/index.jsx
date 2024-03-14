function InputBox({ className = "", name, type = "text", placeholder, value = undefined, required = true , onChange = undefined}) {
  return (
    <input className={'p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none ' + className} placeholder={placeholder} name={name} value={value} type={type} required={required} onChange={onChange} />
  );
}

export default InputBox;