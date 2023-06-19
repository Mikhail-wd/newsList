import Card from "./components/card";
import { useCallback, useEffect, useState } from "react";
import './App.css';


function App() {
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", "")
  }


  const [thisText, textSet] = useState([]);
  const [activeButton, buttonSet] = useState("old")
  const [startTimer, timerSet] = useState(0);

  const requestingData = async (value) => {
    const url = 'http://a0830433.xsph.ru/';
    const data = `actionName=MessagesLoad&messageId=${value}`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }).then(data => data.json())
        .then(txt => textSet([...txt.Messages]))
    } catch (error) { console.log(error) }

  };

  const timer = (value)=>{
    timerSet(value)
    if (value=== 2781) {
    requestingData(value)
    setInterval(() => { requestingData(value) }, 5000)
    } else (
      window.location.reload(true)
    )    
  }

  useEffect(() => {
    requestingData(0)
  }, [])

  return (
    <div className='wrapper'>
      <div className="control">
        <button onClick={() => timer(0)} className={startTimer === 0 ? "active" : ""}>Старые сообщения </button>
        <button onClick={() => timer(2781)} className={startTimer === 2781 ? "active" : ""}>Новые сообщения </button>
      </div>
      <div className="content">
        <div className={thisText.length !== 0 ? "hidden" : "lds-ring"}><div></div><div></div><div></div><div></div></div>
        {thisText.map(index => <Card key={index.id}
          id={index.id}
          date={index.date}
          content={index.content}
          author={index.author}
          attach={index.attachments}
        />)}
      </div>
      <footer>
      </footer>

    </div>
  );
}

export default App;
