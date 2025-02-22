import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MatchingQuestionItem.css';

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const MatchingQuestionItem = ({
  questionItem,
  index,
  userAnswers,
  handleAnswerSelect,
  submitted
}) => {
  // Initialize currentAnswers with shuffled left values from the pairs
  const [currentAnswers, setCurrentAnswers] = useState(() => {
    return shuffleArray(questionItem.pairs.map(pair => pair.left));
  });

  useEffect(() => {
    // Sync the answers whenever the parent changes them
    setCurrentAnswers(userAnswers[index] || shuffleArray(questionItem.pairs.map(pair => pair.left)));
  }, [userAnswers, index, questionItem.pairs]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If no destination or source and destination are the same, do nothing
    if (!destination || destination.index === source.index) return;

    // Clone the current answers to avoid mutating state directly
    const updatedAnswers = [...currentAnswers];

    // Insert the term at the destination position
    const sourceTerm = updatedAnswers[source.index];
    updatedAnswers.splice(source.index, 1);
    updatedAnswers.splice(destination.index, 0, sourceTerm);

    // Log the updated answers after drag-and-drop for debugging
    console.log('Updated answers after drag:', updatedAnswers);

    // Update the state to reflect the new answers
    setCurrentAnswers(updatedAnswers);

    // Sync the updated answers with the parent component
    handleAnswerSelect(index, updatedAnswers);
  };

  const checkAnswer = (userAnswer, leftTerm) => {
    // Find the correct pair based on the left term
    const correctPair = questionItem.pairs.find(pair => pair.left === leftTerm);

    // Log user input and correct answer at this stage for debugging
    console.log(`Checking answer for ${leftTerm}`);
    console.log(`User answer: ${userAnswer}`);
    console.log(`Correct answer: ${correctPair ? correctPair.right : 'Not found'}`);

    // Now check if the userAnswer matches the right term (pair.right)
    const isCorrect = correctPair && correctPair.left === userAnswer;
    console.log(`Is the answer correct? ${isCorrect ? '✅' : '❌'}`);
    return isCorrect;
  };

  return (
    <div className="matching-question-item">
      <h3>{questionItem.question}</h3>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dnd-container">
          <div className="terms-container">
            <Droppable droppableId="terms" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="terms"
                >
                  {currentAnswers.map((term, idx) => {
                    return (
                      <Draggable key={idx} draggableId={`term-${idx}`} index={idx}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-item term"
                          >
                            {term} {/* Display the current answer */}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="definitions-container">
            <Droppable droppableId="definitions" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="definitions"
                >
                  {/* Removed Draggable here to disable dragging on the definitions */}
                  {questionItem.pairs.map((pair, idx) => (
                    <div key={idx} className="definition">
                      {pair.right} {/* Show the function (definition) */}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* After submission, show the user's answers with correctness */}
      {submitted && (
        <div className="answer-check">
          <h4>Your Answers:</h4>
          <ul>
            {questionItem.pairs.map((pair, idx) => {
              const userAnswer = currentAnswers[idx];
              const isCorrect = checkAnswer(userAnswer, pair.left); // Check if the answer matches

              return (
                <li key={idx} className={isCorrect ? 'correct' : 'incorrect'}>
                  {pair.right} = {userAnswer || 'Not answered'}
                  {isCorrect ? ' ✅' : ' ❌'}  {/* Display checkmark or cross */}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchingQuestionItem;
