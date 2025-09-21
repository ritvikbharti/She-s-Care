import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Quiz() {
  const [questions, setQuestions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [report, setReport] = useState(null); //  Store generated report

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = user?.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/questions");
        setQuestions(res.data || {});
        const initialExpanded = {};
        Object.keys(res.data).forEach((cat) => (initialExpanded[cat] = true));
        setExpandedCategories(initialExpanded);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;
  if (!Object.keys(questions).length) return <div>No questions available.</div>;

  const handleOptionSelect = (questionId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubmit = async () => {
    if (!isLoggedIn || !userId) {
      toast.error("You must be logged in to submit the quiz!");
      return;
    }

    try {
      const answers = {};
      Object.entries(selectedOptions).forEach(([qId, value]) => {
        answers[qId] = { value };
      });

      const res = await axios.post(
        "http://localhost:5000/api/questions/submit",
        { answers, userId }
      );

      if (res.data.success) {
        toast.success("Report generated and saved!");
        setReport(res.data.report); // Save report to state
        console.log("Generated Report:", res.data.report);
      } else {
        toast.error("Failed to generate report.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="my-8 h-fit">
      {/* Quiz */}
      {Object.entries(questions).map(([category, qs]) => (
        <div key={category} className="mb-8 border rounded-lg shadow-md">
          <div
            className="bg-primary_hard text-white p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory(category)}
          >
            <span className="font-bold text-lg">{category}</span>
            <span>{expandedCategories[category] ? "▼" : "▶"}</span>
          </div>
          {expandedCategories[category] && (
            <div className="p-4">
              {qs.map((q, idx) => (
                <div key={q._id} className="my-5">
                  <div className="my-3">{`Q${idx + 1}: ${q.question}`}</div>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`p-3 px-6 rounded-2xl my-2 cursor-pointer ${
                          selectedOptions[q._id] === opt.value
                            ? "bg-primary_hard text-white"
                            : "bg-gray-400 hover:bg-primary_hard hover:text-white"
                        }`}
                        onClick={() => handleOptionSelect(q._id, opt.value)}
                      >
                        {opt.option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <button
          className="bg-primary_hard px-9 py-3 rounded-2xl text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Display report after submission */}
      {report && (
        <div className="mt-10 p-6 border rounded-lg bg-gray-100 text-black">
          <h2 className="text-2xl font-bold mb-4">Your PCOD Test Report</h2>
          <p>
            <strong>Risk Level:</strong> {report.report.riskLevel}
          </p>
          <p>
            <strong>Total Score:</strong> {report.report.totalScore}
          </p>
          <div className="mt-4">
            <strong>Recommendations:</strong>
            <ul className="list-disc ml-6 mt-2">
              {report.report.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
