import React, { useState } from "react";
import questions from "../../assets/questions.json";
import { toast, ToastContainer } from "react-toastify";
import { sendQuery } from "../../utils/sendQuery";
export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState({});
  


  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const notifySubmit = async () => {
    try {


      console.log("Selected items:", selectedOptions);
      toast.info("Test submitted!");
      const selectedString = JSON.stringify(selectedOptions);
      const que = `These are the options I selected for my PCOD report. I'll ask questions based on them. Update if you have similar previous data. Test: ${selectedString}`
      const res = await sendQuery(`These are the options I selected for my PCOD report. I'll ask questions based on them. Update if you have similar previous data. Test: ${que}`);
      console.log(que);
      if (res) {
        console.log(res);
        toast.success("Test updated successfully! 😊");
      } else {
        toast.error("Failed to update the test. Please try again.");
      }
    } catch (error) {
      console.error("Error while submitting the test:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  const contextClass = {
    success: "bg-gray-600",
    error: "bg-red-600",
    info: "bg-indigo-600",
    warning: "bg-orange-400",
    default: "bg-indigo-500",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div className="my-8 h-fit">
      {questions.map((question, index) => (
        <div key={question.id} className="my-10">
          <div className="my-5 text-lg">{`Q${index + 1}: ${question.question}`}</div>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={`p-3 px-6 rounded-2xl my-2 cursor-pointer ${
                  selectedOptions[question.question] === option.option
                    ? "bg-primary_hard"
                    : "bg-dark-400 hover:bg-primary_hard"
                }`}
                onClick={() => handleOptionSelect(question.question, option.option)}
              >
                {option.option}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="bg-primary_hard px-9 py-3 rounded-2xl"
          onClick={notifySubmit}
        >
          Submit
        </button>
        <ToastContainer
          toastClassName={(context) =>
            contextClass[context?.type || "default"] +
            " relative flex flex-row p-1 min-h-10 rounded-xl justify-between overflow-hidden font-semibold cursor-pointer m-2"
          }
          bodyClassName={() => "font-white  block p-3"}
          position="bottom-right"
          hideProgressBar
          autoClose={2000}
        />
      </div>
    </div>
  );
}


/*
{
    "How would you describe your menstrual cycle pattern?": {
        "option": "Regular (Occurs every 21–35 days)",
        "value": "regular"
    },
    "When you have your period, how long does it usually last?": {
        "option": "Less than 2 days",
        "value": "short"
    },
    "Have you noticed any of the following? (Select all that apply)": {
        "option": "Excess facial hair growth (On face, chin, or upper lip)",
        "value": "facial_hair"
    },
    "How would you describe your menstrual flow?": {
        "option": "Light to Moderate",
        "value": "light"
    },
    "Do you experience frequent acne breakouts?": {
        "option": "Yes, often (On face, chest, or back)",
        "value": "often"
    },
    "Have you gained weight recently, especially around your abdomen?": {
        "option": "Yes, mild weight gain",
        "value": "mild"
    },
    "Have you noticed darkened skin patches in any of the following areas?": {
        "option": "Groin area",
        "value": "groin"
    },
    "Have you experienced difficulty conceiving or been diagnosed with infertility?": {
        "option": "No",
        "value": "no"
    },
    "Do you frequently feel fatigued or experience mood swings?": {
        "option": "Sometimes",
        "value": "sometimes"
    },
    "Does anyone in your immediate family have PCOD, diabetes, or any other hormonal disorder?": {
        "option": "Yes, diagnosed family members",
        "value": "yes"
    }
}

*/