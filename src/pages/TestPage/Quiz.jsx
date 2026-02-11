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
    Endometrium: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
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
        Endometrium: Number(form.Endometrium)
      };

      const res = await axios.post(
        "http://localhost:5000/api/ml/pcos-predict",
        payload
      );

      setRisk(res.data.riskPercentage);
      setDetected(res.data.detected);

      toast.success("PCOS Risk Calculated!");

    } catch (err) {
      console.error(err);
      toast.error("Prediction failed");
    }
  };

  return (
    <div className="mt-6 bg-black/30 p-6 rounded-xl">

      <h2 className="text-xl font-bold mb-4">Medical PCOS Test Inputs</h2>

      {Object.keys(form).map((key) => (
        <div key={key} className="mb-2">
          <label>{key}</label>
          <input
            type="number"
            name={key}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-200 text-black"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-primary_hard px-6 py-2 rounded-xl text-white w-full text-lg"
      >
        Check PCOS Risk
      </button>
    </div>
  );
}