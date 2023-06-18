import Card from "./components/card";
import { useCallback, useEffect, useState } from "react";
import './App.css';

function App() {
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", "")
  }
  if (!localStorage.getItem("sort")) {
    localStorage.setItem("sort", false)
  }

  const [thisText, textSet] = useState([]);
  const [activeButton, buttonSet] = useState(JSON.parse(localStorage.getItem('sort')))

  function sorting() {
    textSet([...thisText.reverse()]);
    buttonSet(!activeButton);
    localStorage.setItem("sort", !activeButton);
  }

  const timer = () => {
    setInterval(() => { requestingData() }, 5000)
  }

  const requestingData = async () => {
    const url = 'http://a0830433.xsph.ru/';
    const data = "actionName=MessagesLoad&messageId=0";
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }).then(data => data.json())
        .then(txt => localStorage.getItem('sort') === 'true' ? textSet([...txt.Messages.reverse()]) : textSet([...txt.Messages]))
    } catch (error) { console.log(error) }

  };

  useEffect(() => {
    clearInterval(timer());
    timer();
  }, []);

  return (
    <div className='wrapper'>
      <div className="control">
        <button onClick={sorting} className={activeButton === false ? "active" : ""}>Старые сообщения </button>
        <button onClick={sorting} className={activeButton === true ? "active" : ""}>Новые сообщения </button>
      </div>
      <div className="content">
      <div className={thisText.length !== 0 ? "hidden" : "lds-ring" }><div></div><div></div><div></div><div></div></div>
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
