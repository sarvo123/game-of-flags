import react, { useEffect, useState } from "react";
import nations from "./nation";
import "flag-icons/css/flag-icons.css";
import "./App.css";

function App() {
  console.log(nations);

  const [country, setCountry] = useState([]);
  const [flag , setFlag] = useState({})
  const [score , setScore] = useState({total : 0 , incorrect : 0 , correct : 0})
  const [showAns , setShowAns] = useState(false);
  const [selected , setSelected] = useState({})
  const generateRandomNations = () => {
    let ct = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      ct.push(nations[r]);
    }
    
    setCountry(ct);
    let index = Math.floor(Math.random()*4)
    setFlag(ct[index]);
    console.log(ct , ct[index]);
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  const checkAnswer =(country)=>{
    setSelected(country);
    if(country.name === flag.name){
      setScore({...score , correct : score.correct+1 ,total : score.total+1 })
      alert('Correct');
    }
    else{
      setScore({...score , total : score.total+1 , incorrect : score.incorrect+1});
      alert('InCorrect');
    }
    setShowAns(true);
    setTimeout(()=>{
      setShowAns(false);
      nextQuestion();
    },5000)
    
  }

  const nextQuestion =() =>{
    generateRandomNations();
  }

  return (
    <div className="App">
    <div>
      <h2>Total : {score.total}</h2>
      <h2>Correct : {score.correct}</h2>
      <h2>InCorrect : {score.incorrect }</h2>
    </div>
    {
      flag.name ? <span className={`fi fi-${flag['alpha-2'].toLowerCase()}`}></span> : null
    }
      
      <div>
        {
          country.map(c=><button onClick={e=>checkAnswer(c)}>{c.name}</button>)
        }
      </div>
      <div>
        {showAns ? <h2 className={flag.name === selected.name ? 'correct' : 'incorrect'} >Correct Country was : {flag.name}</h2> : null}
      </div>
    </div>
  );
}

export default App;
