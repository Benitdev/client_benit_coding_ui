export default function useInputChange(values: any, setValues: any) {
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/  +/g, '') });
  };
  return {
    onChange,
  };
}
