import { useState } from "react";

const FormPreview = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    schema.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);

    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }

    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");

    setFormData({});
    setErrors({});
  };

  return (
    <>
      <form className="form-preview" onSubmit={handleSubmit}>
        {schema.map((field) => {
          const { id, type, label, required, options } = field;
          //   console.log(options);

          switch (type) {
            case "text":
            case "number":
              return (
                <div key={id}>
                  <label>{label}: </label>
                  <input
                    className="border border-gray-300 rounded px-2 py-1"
                    type={type}
                    required={required}
                    value={formData[id] || ""}
                    onChange={(e) => handleChange(id, e.target.value)}
                  />
                  {errors[field.id] && (
                    <span className="text-red-500">{errors[field.id]}</span>
                  )}
                </div>
              );

            case "checkbox":
              return (
                <div key={id}>
                  <label>
                    <input
                      className="border border-gray-300 rounded px-2 py-1"
                      type="checkbox"
                      checked={formData[id] || false}
                      onChange={(e) => handleChange(id, e.target.checked)}
                    />
                    {label}
                  </label>
                  {errors[field.id] && (
                    <span className="text-red-500">{errors[field.id]}</span>
                  )}
                </div>
              );

            case "select":
              return (
                <div key={id}>
                  <label>{label}</label>
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    required={required}
                    value={formData[id] || ""}
                    onChange={(e) => handleChange(id, e.target.value)}
                  >
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors[field.id] && (
                    <span className="text-red-500">{errors[field.id]}</span>
                  )}
                </div>
              );

            case "radio":
              return (
                <div key={id}>
                  <label>{label}: </label>
                  {options.map((opt, i) => (
                    <label key={i}>
                      <input
                        className="border border-gray-300 rounded px-2 py-1"
                        type="radio"
                        name={id}
                        value={opt}
                        checked={formData[id] === opt}
                        onChange={(e) => handleChange(id, e.target.value)}
                      />
                      &nbsp;{opt}
                    </label>
                  ))}
                  {errors[field.id] && (
                    <span className="text-red-500">{errors[field.id]}</span>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}

        <button
          className="mt-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
};

export default FormPreview;
