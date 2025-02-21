import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MatchingQuestionItem.css';

const MatchingQuestionItem = ({
  questionItem,
  index,
  userAnswers,
  handleAnswerSelect,
  submitted
}) => {
  // Initialize currentAnswers with all left values from the pairs
  const [currentAnswers, setCurrentAnswers] = useState(
    userAnswers[index] || questionItem.pairs.map(pair => pair.left)
  );

  useEffect(() => {
    // Sync the answers whenever the parent changes them
    setCurrentAnswers(userAnswers[index] || questionItem.pairs.map(pair => pair.left));
  }, [userAnswers, index, questionItem.pairs]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
  
    console.log('Drag End Result:', result);
  
    // If no destination or source and destination are the same, do nothing
    if (!destination || destination.index === source.index) return;
  
    // Clone the current answers to avoid mutating state directly
    const updatedAnswers = [...currentAnswers];
  
    console.log('Before Update - currentAnswers:', currentAnswers);
  
    // Fetch terms directly from current answers based on their indices
    const sourceTerm = currentAnswers[source.index];
    const destinationTerm = currentAnswers[destination.index];
  
    console.log('Swapping:');
    console.log(`Source Term: ${sourceTerm} (Index: ${source.index})`);
    console.log(`Destination Term: ${destinationTerm} (Index: ${destination.index})`);
  
    // Perform the swap in the updated answers array
    updatedAnswers[source.index] = destinationTerm;
    updatedAnswers[destination.index] = sourceTerm;
  
    console.log('After Swap - updatedAnswers:', updatedAnswers);
  
    // Update the local state to reflect the changes
    setCurrentAnswers(updatedAnswers);
  
    // Sync the updated answers with the parent component
    handleAnswerSelect(index, updatedAnswers);
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
                  {questionItem.pairs.map((pair, idx) => {
                    return (
                      <Draggable key={idx} draggableId={`term-${idx}`} index={idx}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-item term"
                          >
                            {currentAnswers[idx]} {/* Display the current answer */}
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
                  {questionItem.pairs.map((pair, idx) => (
                    <Draggable key={idx} draggableId={`definition-${idx}`} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-item definition"
                        >
                          {pair.right}
                        </div>
                      )}
                    </Draggable>
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
              const isCorrect = currentAnswers[idx] === pair.right;
              return (
                <li key={idx} className={isCorrect ? 'correct' : 'incorrect'}>
                  {pair.left} = {currentAnswers[idx] || 'Not answered'}
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
