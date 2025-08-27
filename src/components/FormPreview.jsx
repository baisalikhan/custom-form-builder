import { useRef } from "react";

const FormPreview = ({
  schema,
  deleteField,
  updateField,
  deleteAllFields,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const inputRefs = useRef({});
  const formRef = useRef(null);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error if value is no longer empty
    setErrors((prev) => {
      const updated = { ...prev };
      const field = schema.find((f) => f.id === id);

      const isEmpty =
        value === undefined ||
        value === "" ||
        (field?.type === "checkbox" && value === false);

      if (!isEmpty) {
        delete updated[id];
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger native validation UI even with noValidate present
    const nativeOk =
      formRef.current && typeof formRef.current.reportValidity === "function"
        ? formRef.current.reportValidity()
        : true;
    const newErrors = {};

    schema.forEach((field) => {
      const value = formData[field.id];
      const isEmpty =
        value === undefined ||
        value === "" ||
        (field.type === "checkbox" && value === false);

      if (field.required && isEmpty) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    if (!nativeOk || Object.keys(newErrors).length > 0) {
      const firstInvalidId = Object.keys(newErrors)[0];
      const el = inputRefs.current[firstInvalidId];
      if (el && typeof el.focus === "function") {
        el.focus();
      }
      return;
    }

    const payload = {
      byId: { ...formData },
      fields: schema.map(({ id, label, type }) => ({ id, label, type })),
    };
    console.log("Form submitted:", payload);

    alert("Form submitted successfully!");
    setFormData({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="md:w-1/2 border-b text-center text-2xl">Form Preview</div>
      {schema.map((field) => (
        <div
          key={field.id}
          className="flex flex-wrap lg:flex-nowrap gap-4 items-start mt-4 pb-4"
        >
          {/* Actual Input Field - Half Width */}
          <div className="lg:flex-2">
            {field.type === "text" || field.type === "number" ? (
              <>
                <label htmlFor={field.id}>{field.label}: </label>
                <br />
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  className={`border rounded-md p-2 min-w-[220px] w-1/2 mt-1 ${
                    errors[field.id] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={`Enter ${field.label}`}
                  value={formData[field.id] ?? ""}
                  onChange={(e) =>
                    handleChange(
                      field.id,
                      field.type === "number"
                        ? e.target.value === ""
                          ? ""
                          : Number(e.target.value)
                        : e.target.value
                    )
                  }
                  aria-invalid={Boolean(errors[field.id])}
                  aria-describedby={
                    errors[field.id] ? `${field.id}-error` : undefined
                  }
                  required={field.required}
                  ref={(el) => (inputRefs.current[field.id] = el)}
                />
                {errors[field.id] && (
                  <div
                    id={`${field.id}-error`}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors[field.id]}
                  </div>
                )}
              </>
            ) : null}

            {field.type === "checkbox" ? (
              <div className="min-w-[220px]">
                <label>
                  <input
                    type="checkbox"
                    checked={formData[field.id] || false}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                    className={
                      errors[field.id]
                        ? "ring-2 ring-red-500 rounded"
                        : undefined
                    }
                    aria-invalid={Boolean(errors[field.id])}
                    aria-describedby={
                      errors[field.id] ? `${field.id}-error` : undefined
                    }
                    required={field.required}
                    ref={(el) => (inputRefs.current[field.id] = el)}
                  />
                  <span className="ml-2">{field.label}</span>
                </label>
                {errors[field.id] && (
                  <div
                    id={`${field.id}-error`}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors[field.id]}
                  </div>
                )}
              </div>
            ) : null}

            {field.type === "select" ? (
              <>
                <label htmlFor={field.id}>{field.label}: </label>
                <br />
                <select
                  id={field.id}
                  name={field.id}
                  className={`border rounded-md p-2 min-w-[220px] w-1/2 mt-1 ${
                    errors[field.id] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  aria-invalid={Boolean(errors[field.id])}
                  aria-describedby={
                    errors[field.id] ? `${field.id}-error` : undefined
                  }
                  required={field.required}
                  ref={(el) => (inputRefs.current[field.id] = el)}
                >
                  <option value="" disabled>
                    -- Select an option --
                  </option>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[field.id] && (
                  <div
                    id={`${field.id}-error`}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors[field.id]}
                  </div>
                )}
              </>
            ) : null}

            {field.type === "radio" ? (
              <fieldset
                className={`border rounded-md p-2 min-w-[220px] w-1/2 ${
                  errors[field.id] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <legend className="font-medium mb-2">{field.label}</legend>
                {(field.options ?? []).map((opt, i) => (
                  <label key={`${opt}-${i}`} className="block">
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      checked={formData[field.id] === opt}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      aria-invalid={Boolean(errors[field.id])}
                      aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                      }
                      required={field.required}
                      ref={(el) => {
                        if (i === 0) inputRefs.current[field.id] = el;
                      }}
                    />
                    <span className="ml-2">{opt}</span>
                  </label>
                ))}
                {errors[field.id] && (
                  <div
                    id={`${field.id}-error`}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors[field.id]}
                  </div>
                )}
              </fieldset>
            ) : null}
          </div>

          {/* Editing Controls - Half Width */}
          <div className="lg:flex-2 border-b">
            <label htmlFor={field.id}>Label: </label>
            <input
              type="text"
              id={field.id}
              name={field.id}
              value={field.label}
              onChange={(e) => updateField(field.id, "label", e.target.value)}
              placeholder="Enter label"
              className="border border-gray-200 rounded-md p-2"
            />

            <div className="flex items-center my-2">
              <label className="block">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, "required", e.target.checked)
                  }
                />
                <span className="ml-2">Required</span>
              </label>

              <button
                type="button"
                className="border border-red-500 ml-2 px-2 py-1 rounded text-red-500"
                onClick={() => deleteField(field.id)}
              >
                Delete Field
              </button>
            </div>

            {(field.type === "select" || field.type === "radio") && (
              <div className="space-y-1">
                {(field.options ?? []).map((opt, i) => (
                  <div key={`${opt}-${i}`} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = Array.isArray(field.options)
                          ? [...field.options]
                          : [];
                        updated[i] = e.target.value;
                        updateField(field.id, "options", updated);
                      }}
                      className="border p-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const base = Array.isArray(field.options)
                          ? field.options
                          : [];
                        const updated = base.filter((_, idx) => idx !== i);
                        updateField(field.id, "options", updated);
                      }}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateField(field.id, "options", [
                      ...field.options,
                      "New Option",
                    ])
                  }
                  className="text-blue-500"
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex">
        <div className="flex-1">
          {schema.length === 0 ? (
            <p className="text-gray-500">No fields added yet.</p>
          ) : (
            <button type="submit" className="border px-4 py-2 rounded mt-4">
              Submit
            </button>
          )}
        </div>
        <div className="flex-1">
          {schema.length > 1 && (
            <button
              type="button"
              onClick={deleteAllFields}
              className="border px-4 py-2 rounded mt-4 ml-2.5 text-red-500 border-red-500"
            >
              Delete All Fields
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormPreview;
