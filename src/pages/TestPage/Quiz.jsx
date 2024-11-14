import React from "react";
import questions from 'E:/fairymate-ui/fairymate-ui/src/assets/questions.json';

export default function Quiz() {
    return (
        <div className="my-8 h-fit">
            {questions.map((question, index) => (
                <div key={question.id} className="my-10">
                    <div className="my-5">
                        {`Q${index + 1}: ${question.question}`}
                    </div>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li
                                key={optionIndex}
                                className="bg-dark-400 hover:bg-primary_hard p-3 px-6 rounded-2xl my-2"
                            >
                                {option.option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button className=" bg-primary_hard px-9  py-3 rounded-2xl">Submit</button>
        </div>
    );
}
