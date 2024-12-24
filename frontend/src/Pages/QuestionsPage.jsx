import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get dynamic parameters from the URL

const QuestionsPage = () => {
    const { grade, subject, unit } = useParams(); // Get the grade, subject, and unit from the URL params
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch or generate questions based on the grade, subject, and unit
        // For simplicity, using hardcoded questions based on unit type
        const generateQuestions = (subject, unit) => {
            const questionsList = [];
            if (subject === 'Math') {
                if (unit === 'Multiplication') {
                    // Example multiplication questions
                    for (let i = 1; i <= 5; i++) {
                        questionsList.push(`What is ${i} x 2?`);
                    }
                } else if (unit === 'Division') {
                    // Example division questions
                    for (let i = 10; i <= 50; i += 10) {
                        questionsList.push(`What is ${i} ÷ 10?`);
                    }
                }
            }
            // Add more subjects and units as necessary
            return questionsList;
        };

        const loadedQuestions = generateQuestions(subject, unit);
        setQuestions(loadedQuestions);
    }, [grade, subject, unit]);

    return (
        <div className="questions-page">
            <h2>Questions for {grade} - {subject} - {unit}</h2>
            <div className="questions-list">
                {questions.map((question, index) => (
                    <div key={index} className="question">
                        {question}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsPage;
