import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MatchingQuestionItem.css';

const MatchingQuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, submitted }) => {
    const [selectedPairs, setSelectedPairs] = useState(userAnswers[index] || []);
    const [score, setScore] = useState(0);

    // Calculate the score based on correct matches
    const getScore = () => {
        return selectedPairs.filter(pair => {
            // Safe access to pair properties
            const match = questionItem.pairs.find(p => p.left === pair.left);
            return match && pair.right === match.right;
        }).length;
    };

    useEffect(() => {
        if (submitted) {
            setScore(getScore());
        }
    }, [submitted, selectedPairs]);

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return; // if dropped outside
    
        // If it's dropped on the same place, do nothing
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
    
        const items = Array.from(selectedPairs);
    
        // If dropped into the terms area, just re-order the terms
        if (destination.droppableId === "terms") {
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);
        }
    
        // If dropped into the definitions area, pair the term with the definition
        if (destination.droppableId === "definitions") {
            const matchedTerm = items[source.index];
            const matchedDefinition = questionItem.pairs[destination.index].right;
            const newPair = { left: matchedTerm, right: matchedDefinition };
            
            const updatedPairs = [...selectedPairs, newPair];
            setSelectedPairs(updatedPairs);
        }
    
        // Update the parent state with the selected answers
        if (!submitted) {
            handleAnswerSelect(index, selectedPairs);  // This is your callback to update answers in the parent
        }
    };
    

    // Make sure the pairs are valid before rendering
    const validPairs = questionItem.pairs?.filter(pair => pair?.left && pair?.right) || [];

    return (
        <div className="matching-question-item">
            <p className="question-text">{index + 1}. {questionItem.question}</p>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="matching-container">
                    <Droppable droppableId="terms" direction="horizontal">
                        {(provided) => (
                            <div
                                className="terms-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {validPairs.map((pair, i) => {
                                    const isMatched = selectedPairs.some(selectedPair => selectedPair?.left === pair?.left);
                                    return (
                                        <Draggable key={pair?.left} draggableId={`term-${pair?.left}`} index={i}>
                                            {(provided) => (
                                                <div
                                                    className={`option-item ${isMatched ? 'matched' : ''}`}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        cursor: submitted || isMatched ? 'not-allowed' : 'move',
                                                    }}
                                                >
                                                    {pair?.left}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="definitions">
                        {(provided) => (
                            <div
                                className="definitions-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {validPairs.map((pair, i) => {
                                    const isMatched = selectedPairs.some(selectedPair => selectedPair?.right === pair?.right);
                                    return (
                                        <div
                                            key={pair?.right}
                                            className={`definition-box ${isMatched ? 'matched' : ''}`}
                                            style={{
                                                backgroundColor: isMatched ? '#c8e6c9' : '#f1f1f1',
                                                borderColor: isMatched ? '#4caf50' : '#ddd',
                                            }}
                                        >
                                            {pair?.right}
                                        </div>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

            {submitted && (
                <div className="feedback">
                    <p className="score">Your score: {score} / {validPairs.length}</p>
                    {score === validPairs.length ? (
                        <p className="correct">✔ All pairs are correct!</p>
                    ) : (
                        <p className="incorrect">✘ Some pairs are incorrect.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchingQuestionItem;
