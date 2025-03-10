import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/QuestionsPage.css';
import QuestionItem from '../Components/QuestionsPage/QuestionItem';
import ResultsSummary from '../Components/QuestionsPage/ResultsSummary';
import MatchingQuestionItem from '../Components/QuestionsPage/MatchingQuestionItem/MatchingQuestionItem';
import MultipleChoiceQuestionItem from '../Components/QuestionsPage/MultipleChoiceQuestionItem/MultipleChoiceQuestionItem';
import FillBlankQuestionItem from '../Components/QuestionsPage/FillBlankQuestionItem/FillBlankQuestionItem';


const QuestionsPage = () => {
    const { grade, subject, unit } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadQuestionsData = async () => {
            try {
                const filePath = `${grade}/${subject}/${grade}${subject}.json`;
                const response = await fetch(`https://raw.githubusercontent.com/gaoaaron1/chill-learn-data/main/${filePath}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to load data for grade ${grade}, subject ${subject}`);
                }

                const data = await response.json();

                if (data[grade] && data[grade][subject] && data[grade][subject][unit]) {
                    const questionsForUnit = data[grade][subject][unit];
                    const shuffledQuestions = questionsForUnit.sort(() => Math.random() - 0.5);
                    const selectedQuestions = shuffledQuestions.slice(0, 10);
                    setQuestions(selectedQuestions);
                    setStartTime(Date.now());
                } else {
                    console.error(`No questions found for grade ${grade}, subject ${subject}, unit ${unit}`);
                }
            } catch (error) {
                console.error("Error loading questions data:", error);
            }
        };

        loadQuestionsData();
    }, [grade, subject, unit]);

    const handleAnswerSelect = (questionIndex, selectedOption, blankIndex) => {
        if (submitted) return;

        setUserAnswers(prevState => {
            const updatedAnswers = { ...prevState };

            if (blankIndex !== undefined) {
                // Detects fill-in-the-blank questions
                if (!updatedAnswers[questionIndex]) updatedAnswers[questionIndex] = [];
                updatedAnswers[questionIndex][blankIndex] = selectedOption;
            } else {
                updatedAnswers[questionIndex] = selectedOption;
            }

            return updatedAnswers;
        });
    };

    const handleSubmit = () => {
        const unansweredQuestions = questions.filter((_, index) => !userAnswers[index]);
       
        if (unansweredQuestions.length > 0) {
            setShowModal(true);  // Show the modal if there are unanswered questions
        } else {
            submitAnswers();
        } 
    };

    const submitAnswers = () => {

        if (!startTime) {
            console.error("Quiz start time is not set.");
            return;
        }

        const endTime = Date.now();
        const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
        setTimeTaken(elapsedSeconds);

        let totalScore = 0;
        const newResults = questions.map((question, index) => {
            if (question.blanks) {
                const totalBlanks = question.blanks.length;
                const correctAnswers = question.blanks.filter((blank, i) => userAnswers[index]?.[i] === blank.answer).length;
                const fractionScore = correctAnswers / totalBlanks;
        
                return {
                    correct: correctAnswers === totalBlanks,
                    partialCorrect: correctAnswers,
                    totalBlanks,
                    correctAnswer: question.blanks.map(b => b.answer),
                };
            } else if (question.type === "matching") {
                const correctPairs = question.pairs;
                const userMatchedAnswers = userAnswers[index] || [];
                let correctMatches = 0;
        
                correctPairs.forEach((pair, idx) => {
                    if (userMatchedAnswers[idx] === pair.left) {
                        correctMatches++;
                    }
                });
        
                const fractionScore = correctMatches / correctPairs.length;
                totalScore += fractionScore;
        
                return {
                    correct: correctMatches === correctPairs.length,
                    partialCorrect: correctMatches,
                    totalBlanks: correctPairs.length,
                    correctAnswer: Array.isArray(correctPairs) ? correctPairs.map(p => p.left) : [],
                };
            }
            else
            
            
            {
                const isCorrect = question.answer === userAnswers[index];
                return {
                    correct: isCorrect,
                    userAnswer: userAnswers[index],
                    correctAnswer: question.answer,
                };
            }
        });
        

        

        

        setResults(newResults);
        setSubmitted(true);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleModalConfirm = () => {
        setShowModal(false);  // Close the modal
        submitAnswers();  // Proceed with submitting answers
    };

    const handleModalCancel = () => {
        setShowModal(false);  // Just close the modal and let the user continue
    };


    const calculateScore = () => {
        if (!results) return { correctCount: 0, percentage: 0 };

        const totalScore = results.reduce((sum, result) => {
            if (result.partialCorrect !== undefined) {
                return sum + result.partialCorrect / result.totalBlanks;
            }
            return sum + (result.correct ? 1 : 0);
        }, 0);

        const percentage = Math.round((totalScore / results.length) * 100);

        return { correctCount: parseFloat(totalScore.toFixed(2)), percentage };
    };

    const { correctCount, percentage } = calculateScore();

    return (
        <div className="questions-page">
            <h2>Exam for {grade} - {subject} - {unit}</h2>
            <form>
                <div className="questions-list">
                    {questions.map((questionItem, index) => {
                        if (questionItem.type === 'multiple-choice') {
                            return (
                                <MultipleChoiceQuestionItem
                                    key={index}
                                    questionItem={questionItem}
                                    index={index}
                                    userAnswers={userAnswers}
                                    handleAnswerSelect={handleAnswerSelect}
                                    submitted={submitted}
                                />
                            );
                        }

                        if (questionItem.type === 'matching') {
                            return (
                                <MatchingQuestionItem
                                    key={index}
                                    questionItem={questionItem}
                                    index={index}
                                    userAnswers={userAnswers}
                                    handleAnswerSelect={handleAnswerSelect}
                                    submitted={submitted}
                                />
                            );
                        }

                        if (questionItem.type === 'fill-in-the-blank') {
                            return (
                                <FillBlankQuestionItem
                                    key={index}
                                    questionItem={questionItem}
                                    index={index}
                                    userAnswers={userAnswers}
                                    handleAnswerSelect={handleAnswerSelect}
                                    submitted={submitted}
                                />
                            );
                        }

                        return (
                            <QuestionItem
                                key={index}
                                questionItem={questionItem}
                                index={index}
                                userAnswers={userAnswers}
                                handleAnswerSelect={handleAnswerSelect}
                                results={results}
                                submitted={submitted}
                            />
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-btn"
                    disabled={submitted}
                >
                    Submit
                </button>
            </form>

            {results && (
                <ResultsSummary
                    timeTaken={timeTaken}
                    correctCount={correctCount}
                    totalQuestions={questions.length}
                    percentage={percentage}
                />
            )}


            {/* Modal for confirmation */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure you want to submit your answers?</h3>
                        <p>You have unanswered questions.</p>
                        <button onClick={handleModalConfirm}>Yes, Submit</button>
                        <button onClick={handleModalCancel}>No, Go Back</button>
                    </div>
                </div>
            )}
        </div>

        
    );
};

export default QuestionsPage;
