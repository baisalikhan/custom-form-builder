import { useState } from "react";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [formSchema, setFormSchema] = useState([]);

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
      required: true,
      options:
        type === "select" || type === "radio" ? ["Option 1", "Option 2"] : [],
    };

    setFormSchema((prev) => [...prev, newField]);
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
      <div className="flex md:flex-nowrap flex-wrap [&>button]:border [&>button]:rounded gap-2 [&>button]:px-2 m-5">
        <button onClick={() => addField("text")}>Add Text Input</button>
        <button onClick={() => addField("number")}>Add Number Input</button>
        <button onClick={() => addField("checkbox")}>Add Checkbox</button>
        <button onClick={() => addField("select")}>Add Select</button>
        <button onClick={() => addField("radio")}>Add Radio Group</button>
      </div>

      {/* <input
        value={field.label}
        onChange={(e) => updateField(field.id, "label", e.target.value)}
      /> */}

      <div className="m-5">
        <FormPreview
          schema={formSchema}
          deleteField={deleteField}
          updateField={updateField}
        />
      </div>

      {/* <pre>{JSON.stringify(formSchema, null, 2)}</pre> */}
    </>
  );
};

export default FormBuilder;
