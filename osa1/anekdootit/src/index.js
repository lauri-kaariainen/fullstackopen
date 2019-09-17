import React, { useState } from "react";
import ReactDOM from "react-dom";

const InvertButton = ({ text, ...rest }) => (
  <button style={{ color: "white", background: "black" }} {...rest}>
    {text}
  </button>
);

const AnecdoteWithMostVotes = ({ anecdotes, votesObj }) => {
  const maxValue = Math.max(...Object.values(votesObj));
  const maxIndex = Object.values(votesObj).indexOf(maxValue);
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {!Math.max(...Object.values(votesObj)) ? (
        <>No votes</>
      ) : (
        <>
          <div>{anecdotes[maxIndex]}</div>
          has {maxValue} votes
        </>
      )}
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votesObj, setVotesObj] = useState({
    ...Array.from(Array(anecdotes.length)).map(e => 0)
  });
  console.log(votesObj, selected);
  const getRandomArrayIndex = array =>
    Math.floor(Math.random() * anecdotes.length);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        <InvertButton
          text={"next anecdote"}
          onClick={e => setSelected(getRandomArrayIndex(anecdotes))}
        />
      </div>
      <div>{anecdotes[selected]}</div>
      <InvertButton
        text={"vote"}
        onClick={e => {
          setVotesObj({ ...votesObj, [selected]: votesObj[selected] + 1 });
        }}
      />
      <div>has {votesObj[selected]} votes</div>
      <AnecdoteWithMostVotes anecdotes={anecdotes} votesObj={votesObj} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
