// BMI Validation
export const validateBMI = (bmi) => {
  if (!bmi) return "BMI is required";

  const value = Number(bmi);

  if (isNaN(value)) return "BMI must be a number";
  if (value < 10 || value > 60) return "BMI must be between 10 and 60";

  return "";
};

// Cycle Length Validation
export const validateCycleLength = (cycle) => {
  if (!cycle) return "Cycle length is required";

  const value = Number(cycle);

  if (isNaN(value)) return "Cycle length must be a number";
  if (value < 21 || value > 45)
    return "Cycle length must be between 21 and 45 days";

  return "";
};

// Numeric Validation (Hormones etc)
export const isNumeric = (value) => {
  if (!value) return "Value is required";
  if (isNaN(Number(value))) return "Only numeric values allowed";

  return "";
};
