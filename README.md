# lib-cbvisual

> Chatbot Visual

[![NPM](https://img.shields.io/npm/v/lib-cbvisual.svg)](https://www.npmjs.com/package/lib-cbvisual) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save lib-cbvisual
```

## Usage

```jsx
import { ChatbotComponent } from 'lib-cbvisual'
import 'lib-cbvisual/dist/index.css'

function App() {
  return (
    <div className="App">
      <ChatbotComponent ws={'wss://web-socket-address'} />
    </div>
  );
}

export default App;

```

## License

MIT © [ZamurVedovatto](https://github.com/ZamurVedovatto)
