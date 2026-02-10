import React, { useState } from "react";
import {
  validateBMI,
  validateCycleLength,
  isNumeric,
} from "../utils/validationUtils";

const RiskTestForm = () => {
  const [formData, setFormData] = useState({
    bmi: "",
    cycleLength: "",
    hormone: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    const bmiError = validateBMI(formData.bmi);
    if (bmiError) newErrors.bmi = bmiError;

    const cycleError = validateCycleLength(formData.cycleLength);
    if (cycleError) newErrors.cycleLength = cycleError;

    const hormoneError = isNumeric(formData.hormone);
    if (hormoneError) newErrors.hormone = hormoneError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form Submitted Successfully ✅");
      console.log(formData);
    }
  };

  const isFormInvalid = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>PCOS Risk Test Form</h2>

      {/* BMI */}
      <input
        type="text"
        name="bmi"
        placeholder="Enter BMI"
        value={formData.bmi}
        onChange={handleChange}
      />
      {errors.bmi && <p style={{ color: "red" }}>{errors.bmi}</p>}

      {/* Cycle Length */}
      <input
        type="text"
        name="cycleLength"
        placeholder="Cycle Length (days)"
        value={formData.cycleLength}
        onChange={handleChange}
      />
      {errors.cycleLength && (
        <p style={{ color: "red" }}>{errors.cycleLength}</p>
      )}

      {/* Hormone Value */}
      <input
        type="text"
        name="hormone"
        placeholder="Hormone Value"
        value={formData.hormone}
        onChange={handleChange}
      />
      {errors.hormone && <p style={{ color: "red" }}>{errors.hormone}</p>}

      <button type="submit" disabled={isFormInvalid}>
        Submit
      </button>
    </form>
  );
};

export default RiskTestForm;


//👉 This file is the actual form user sees on screen

// 💡 What It Does
// It:

// ✅ Shows input boxes (BMI, Cycle Length, Hormone)
// ✅ Takes user input
// ✅ Sends input to validation file
// ✅ Shows error messages if wrong
// ✅ Stops form submit if wrong
// ✅ Submits form if everything correct
