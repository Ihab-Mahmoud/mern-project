/* eslint-disable react/prop-types */


const FormRowSelect = ({
  name,
  labelValue,
  defaultValue = "",
  list,
  onChangeSubmit,
}) =>
{
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelValue || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={(onChangeSubmit)}
      >
        {list.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
