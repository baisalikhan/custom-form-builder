import { useState } from "react";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [formSchema, setFormSchema] = useState([]);

  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: true,
      options: type === " " || type === "radio" ? ["Option 1", "Option 2"] : [],
    };

    setFormSchema([...formSchema, newField]);
  };
  const updateField = (id, key, value) => {
    setFormSchema((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const deleteField = (id) => {
    setFormSchema((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <>
      <div className="flex [&>button]:border [&>button]:rounded [&>button]:mr-2 [&>button]:px-2 m-5">
        <button onClick={() => addField("text")}>Add Text</button>
        <button onClick={() => addField("number")}>Add Number</button>
        <button onClick={() => addField("checkbox")}>Add Checkbox</button>
        <button onClick={() => addField("select")}>Add Select</button>
        <button onClick={() => addField("radio")}>Add Radio</button>
      </div>

      {/* <input
        value={field.label}
        onChange={(e) => updateField(field.id, "label", e.target.value)}
      /> */}

      <div className="m-5">
        <FormPreview schema={formSchema} />
      </div>

      {/* <pre>{JSON.stringify(formSchema, null, 2)}</pre> */}
    </>
  );
};

export default FormBuilder;
