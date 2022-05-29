import React, { useEffect, useState } from 'react';
import WorkerBuilder from './WorkerBuilder';
import worker from './worker';

const webWorker = new WorkerBuilder(worker);

function App() {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState(undefined);
  const [clr, setClr] = useState('#60CFF7');

  useEffect(() => {
    webWorker.onmessage = (message) => {
      if (message) {
        setData({ ...message.data });
        console.log('Worker finished\n');
        setDisabled(false);
      }
    };
  }, []);

  const changeClr = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setClr((clr) => '#' + randomColor);
  };

  const callWorker = (event: React.MouseEvent) => {
    event.preventDefault();
    setDisabled(true);
    setData(undefined);
    console.log('Worker starting');
    webWorker.postMessage({
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    });
  };

  return (
    <div className="App">
      <button onClick={callWorker} disabled={disabled}>
        Run Worker
      </button>

      <button onClick={changeClr}>Set BG</button>

      <div style={{ backgroundColor: clr, height: '200px' }}>
        {clr}
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : ''}
      </div>
    </div>
  );
}

export default App;
