
// eslint-disable-next-line react/prop-types
const Formraw = ({ type, name, defaultValue="", labelValue,onChangeSubmit }) =>
{
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelValue ? `${labelValue}` : `${name}`}
      </label>
      <input
        required
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="form-input"
        id={name}
        onChange={( onChangeSubmit)}
      />
    </div>
  );
};

export default Formraw;
