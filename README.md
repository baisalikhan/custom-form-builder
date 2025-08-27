# 🧩 Mini Custom Form Builder

A lightweight React-based form builder to dynamically create, edit, and preview custom forms. Simple, accessible, and extensible.

---

## 📦 Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS 4**
- No external form libraries or state managers

---

## ✨ Features

- Add fields: text, number, checkbox, select, radio
- Edit label, required flag, and manage options (select/radio)
- Live preview with controlled inputs
- Validation: custom and native browser validation together
  - Custom errors: red borders/rings on invalid fields
  - Auto-focus on the first invalid field on submit
  - Native UI surfaced via `reportValidity()`
- Inline error messages that clear on change
- Delete a single field or reset all
- Safe state updates and defensive guards for options/values

---

## 🖱️ Usage

1. Click buttons in "Add Field" to insert inputs.
2. Edit labels, toggle Required, and manage options for select/radio.
3. Submit to validate; fix highlighted fields (first invalid is focused).
4. On success, the console logs a payload:

```js
{
  byId: { /* values keyed by field.id */ },
  fields: [ { id, label, type }, ... ]
}
```

Notes:

- Number inputs store numbers (empty string allowed while editing).
- Checkbox defaults: not required, unchecked (false).
- Select has a placeholder option; radio options must be non-empty strings.

---

## 📁 Project Structure

- `src/components/FormBuilder.jsx`: Schema management, add/update/delete field APIs
- `src/components/FormPreview.jsx`: Renders form and the per-field editors
- `src/App.jsx`: Root composition
- `index.html`: App shell and title

---

## 🛠️ Setup

```bash
# Install deps
npm install

# Start dev server
npm run dev

# Build
npm run build
```

---

## ♿ Accessibility & Validation

- Proper `label`/`htmlFor` associations
- Inline errors with `aria-invalid` and `aria-describedby`
- Combines native validation and custom rules (first invalid field focused)

---

## ➕ Extending

- Add new field types by following the schema shape `{ id, type, label, required, options? }`
- For selectable types, ensure `options` is an array of non-empty strings
- Keep validations in sync for `handleChange` and submit checks

---

## 📄 License

This project is for evaluation purposes only. No license applied.
