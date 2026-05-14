import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Quiz({ setRisk, setDetected }) {
  const [form, setForm] = useState({
    BMI: "",
    Cycle_length: "",
    FSH: "",
    LH: "",
    FSH_LH: "",
    AMH: "",
    Follicle_No_L: "",
    Follicle_No_R: "",
    Endometrium: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const empty = Object.entries(form).find(([, v]) => v === "");
    if (empty) {
      toast.error(`Please fill in ${empty[0]}`);
      return;
    }

    try {
      const payload = {
        BMI: Number(form.BMI),
        Cycle_length: Number(form.Cycle_length),
        FSH: Number(form.FSH),
        LH: Number(form.LH),
        FSH_LH: Number(form.FSH_LH),
        AMH: Number(form.AMH),
        Follicle_No_L: Number(form.Follicle_No_L),
        Follicle_No_R: Number(form.Follicle_No_R),
        Endometrium: Number(form.Endometrium),
      };

      const mlRes = await axios.post(
        "http://localhost:5000/api/ml/pcos-predict",
        payload
      );

      const { riskPercentage, detected } = mlRes.data;

      setRisk(riskPercentage);
      setDetected(detected);

      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser).id : null;

      await axios.post("http://localhost:5000/api/reports/add", {
        userId,
        inputs: payload,
        riskPercentage,
        detected,
      });

      toast.success("PCOS Risk Calculated & Saved!");
    } catch (err) {
      console.error("Quiz error:", err);
      toast.error(
        err.response?.data?.message || "Prediction failed. Please try again."
      );
    }
  };

  const fields = {
    BMI: "BMI (e.g. 22.5)",
    Cycle_length: "Cycle Length (days)",
    FSH: "FSH (mIU/mL)",
    LH: "LH (mIU/mL)",
    FSH_LH: "FSH/LH Ratio",
    AMH: "AMH (ng/mL)",
    Follicle_No_L: "Follicles - Left Ovary",
    Follicle_No_R: "Follicles - Right Ovary",
    Endometrium: "Endometrium (mm)",
  };

  return (
    <div className="mt-6 bg-black/30 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Medical PCOS Test Inputs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="text-sm text-gray-300 mb-1 block">
              {fields[key] || key}
            </label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder="Enter value"
              className="w-full p-2 rounded bg-gray-200 text-black"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-primary_hard px-6 py-3 rounded-xl text-white w-full text-lg font-semibold hover:opacity-90 transition"
      >
        Check PCOS Risk
      </button>
    </div>
  );
}