import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/QuestionsPage.css';

const QuestionsPage = () => {
    const { grade, subject, unit } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);

    useEffect(() => {
        // Dynamically import the corresponding JSON file for the selected grade
        const loadQuestionsData = async () => {
            try {
                const response = await fetch(`/data/${grade}Questions.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load data for grade ${grade}`);
                }
                
                const data = await response.json();
                const subjectData = data[grade]?.[subject]?.[unit]; // Accessing the questions for the selected grade, subject, and unit
                
                if (subjectData && subjectData.length) {
                    const shuffledQuestions = subjectData.sort(() => Math.random() - 0.5);
                    const selectedQuestions = shuffledQuestions.slice(0, 10); // Select 10 random questions
                    setQuestions(selectedQuestions);
                    setStartTime(Date.now()); // Set the start time when questions are loaded
                } else {
                    console.error(`No questions found for grade ${grade}, subject ${subject}, unit ${unit}`);
                }
        
            } catch (error) {
                console.error("Error loading questions data:", error);
            }
        };
        
        loadQuestionsData();
    }, [grade, subject, unit]);

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: selectedOption,
        });
    };

    const handleSubmit = () => {
        if (!startTime) {
            console.error("Quiz start time is not set.");
            return;
        }

        const endTime = Date.now();
        const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
        setTimeTaken(elapsedSeconds);

        const newResults = questions.map((question, index) => ({
            correct: question.answer === userAnswers[index],
            userAnswer: userAnswers[index],
            correctAnswer: question.answer,
        }));
        setResults(newResults);

        // Scroll to the very bottom of the page after submitting
        window.scrollTo(0, document.body.scrollHeight);
    };

    const calculateScore = () => {
        if (!results) return { correctCount: 0, percentage: 0 };
        const correctCount = results.filter((result) => result.correct).length;
        const totalQuestions = results.length;
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        return { correctCount, percentage };
    };

    const { correctCount, percentage } = calculateScore();

    return (
        <div className="questions-page">
            <h2>Exam for {grade} - {subject} - {unit}</h2>
            <form>
                <div className="questions-list">
                    {questions.map((questionItem, index) => (
                        <div key={index} className="question-item">
                            <p className="question-text">
                                {index + 1}. {questionItem.question}
                            </p>
                            <ul className="options-list">
                                {questionItem.options.map((option, i) => (
                                    <li key={i} className="option-item">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={option}
                                                checked={userAnswers[index] === option}
                                                onChange={() => handleAnswerSelect(index, option)}
                                            />
                                            <span className="option-label">
                                                {String.fromCharCode(65 + i)}. {option}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {results && (
                                <p className={`feedback ${results[index].correct ? 'correct' : 'incorrect'}`}>
                                    {results[index].correct
                                        ? `✔ Correct answer: ${results[index].correctAnswer}`
                                        : `✘ Wrong answer: Answer is ${results[index].correctAnswer}`}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleSubmit} className="submit-btn">
                    Submit
                </button>
            </form>

            {/* Results Summary Section at the Bottom */}
            {results && (
                <div className="results-summary">
                    <h3>Results Summary</h3>
                    <p>Time taken: {Math.floor(timeTaken / 60)} minutes and {timeTaken % 60} seconds</p>
                    <p>Correct answers: {correctCount} out of {questions.length}</p>
                    <p>Score: {percentage}%</p>
                </div>
            )}
        </div>
    );
};

export default QuestionsPage;
