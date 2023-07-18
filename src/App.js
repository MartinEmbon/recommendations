import './App.css';
import ChatMessage from './ChatMessage';
import './normal.css'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [input, setInput] = useState("")
  const [models, setModels] = useState([])
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?",
  }, {
    user: "me",
    message: "I want to use chatgpt today?",
  }])

  function clearChat() {
    setChatLog([])
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    setInput("")
    setChatLog(chatLogNew)
    // console.log(data.message)
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    })
    const data = await response.json()
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
    console.log(data.message)
  }

  // function getEngines() {
  //   fetch("Http://localhost:3080/models")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.model.data)
  //       setModels(data.models.data)
  //     })
  // }

  // useEffect(() => {
  //   getEngines()
  // }, [])

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        {/* <div className="models">
          <select>
            {models.map((model, index) => (
              <option
                key={model.id} value={model.id}>
                {model.id}
              </option>
            ))}
          </select>
        </div> */}
      </aside>
      <section className='chatbox'>
        <div className='chat-log'>



          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}


        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input className='chat-input-textarea'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="1"
            ></input>
          </form>
        </div>
      </section>

    </div>
  );
}



export default App;
