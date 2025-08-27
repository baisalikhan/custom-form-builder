# 🧩 Mini Custom Form Builder

A lightweight React-based form builder that allows users to dynamically create, edit, and preview custom forms. Built with simplicity and clarity in mind.

---

## 🚀 Live Demo

Hosted on Netlify: [Visit the Live App](https://custom-form-builder-app.netlify.app/)

---

## 📦 Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS 4**
- No external form libraries or state managers used

---

## ✨ Features

- Add fields: text, number, checkbox, select, radio
- Edit field label, required flag, and options (for select/radio)
- Real-time form preview with controlled inputs
- Validation for required fields
- Error messages shown inline and cleared on interaction
- Submit logs form data using field labels as keys
- Delete individual fields or reset all with "Delete All Fields" button

---

## 📁 Project Structure

- `FormBuilder.jsx`: Manages schema state and field creation
- `FormPreview.jsx`: Renders live form and editing controls
- `App.jsx`: Root component tying everything together

---

## 🛠️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/baisalikhan/custom-form-builder.git
cd react-form-builder

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🎯 Design Philosophy

This project was built with a focus on:

- `Simplicity`: Minimal dependencies and clean logic
- `Usability`: Clear layout and responsive error handling
- `Extensibility`: Easy to add new field types or features

---

## 📌 Notes

- No field is selected by default in dropdowns
- Radio groups are properly labeled and grouped
- Error messages disappear when fields are corrected or marked non-required

---

## 📄 License

- This project is for evaluation purposes only. No license applied.
