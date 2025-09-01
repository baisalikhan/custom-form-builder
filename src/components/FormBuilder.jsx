import { useState } from "react";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [formSchema, setFormSchema] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const addField = (type) => {
    const timestamp = Date.now();
    const uniqueId = `field-${type}-${timestamp}`;

    const defaultLabels = {
      text: "Text Input",
      number: "Number Input",
      checkbox: "Checkbox",
      select: "Select Dropdown",
      radio: "Radio Group",
    };

    const newField = {
      id: uniqueId,
      type,
      label: defaultLabels[type] || "New Field",
      required: type === "checkbox" ? false : true,
      options:
        type === "select" || type === "radio" ? ["Option 1", "Option 2"] : [],
    };

    setFormSchema((prev) => [...prev, newField]);
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [uniqueId]: false }));
    }
  };

  const updateField = (id, key, value) => {
    setFormSchema((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        if (key === "options") {
          const arr = Array.isArray(value) ? value : [];
          return { ...f, options: arr };
        }
        if (key === "required") return { ...f, required: Boolean(value) };
        if (key === "label") return { ...f, label: String(value) };
        return f;
      })
    );
    if (key === "required" && value === false) {
      setErrors((prev) => {
        const { [id]: _omit, ...rest } = prev;
        return rest;
      });
    }
  };

  const deleteField = (id) => {
    setFormSchema((prev) => prev.filter((f) => f.id !== id));

    setFormData((prev) => {
      const { [id]: _omit, ...rest } = prev;
      return rest;
    });
    setErrors((prev) => {
      const { [id]: _omit, ...rest } = prev;
      return rest;
    });
  };

  const deleteAllFields = () => {
    setFormSchema([]);
    setFormData({});
    setErrors({});
  };

  return (
    <>
      <div className="border-2 border-gray-300 rounded-md p-3 mx-5 my-2 w-fit">
        <h6 className="mb-2 text-gray-600 font-bold text-xl whitespace-nowrap">
          Add Field:
        </h6>
        <div className="flex md:flex-nowrap flex-wrap [&>button]:border-2 [&>button]:border-gray-300 [&>button]:rounded-md gap-2 [&>button]:p-2 [&>button]:whitespace-nowrap">
          <button type="button" onClick={() => addField("text")}>
            Text Input
          </button>
          <button type="button" onClick={() => addField("number")}>
            Number Input
          </button>
          <button type="button" onClick={() => addField("checkbox")}>
            Checkbox
          </button>
          <button type="button" onClick={() => addField("select")}>
            Select
          </button>
          <button type="button" onClick={() => addField("radio")}>
            Radio Group
          </button>
        </div>
      </div>

      <div className="m-5">
        <FormPreview
          schema={formSchema}
          deleteField={deleteField}
          updateField={updateField}
          deleteAllFields={deleteAllFields}
          errors={errors}
          setErrors={setErrors}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/* <pre>{JSON.stringify(formSchema, null, 2)}</pre> */}
    </>
  );
};

export default FormBuilder;
