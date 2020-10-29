import React from 'react'

import { ChatbotComponent } from 'lib-cbvisual'
import 'lib-cbvisual/dist/index.css'

const App = () => {
  return <ChatbotComponent ws={'wss://atendimento.omnisiga.com/chatbot/chatWS?cidade=1'} />
}

export default App
