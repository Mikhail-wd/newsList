import Card from "./components/card";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites","")
  }

  const [thisText, textSet] = useState([]);

  function sorting() {
    textSet ([...thisText.reverse()])
  }
  const requestingData = async () => {
    const url = 'http://a0830433.xsph.ru/';
    const data = "actionName=MessagesLoad&messageId=0";
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    }).then(data => data.json()).then(txt => textSet(txt.Messages))
  }

  useEffect(() => {
      requestingData();
  }, []);

  return (
    <div className='wrapper'>      
      <div className="control">
        <button onClick={sorting}>Сортировать</button>
      </div>
      {thisText.map(index => <Card key={index.id}
      id = {index.id}
      date={index.date}
      content={index.content}
      author ={index.author}
      attach = {index.attachments}  
      />)}
    </div>
  );
}

export default App;
