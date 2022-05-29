/*
You can't use axios inside the worker 
because the blob that's created behind the scenes to load the worker.js 
runs in a different context than your main.js. 
In order for axios to work, you would have to 
setup a new webpack bundler to just bundle the worker by itself. 
 */

const worker = () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    setTimeout(function () {
      fetch(message.data.url)
        .then((response) => response.json())
        .then((json) => {
          postMessage(json);
        });
    }, 3000);
  };
};

export default worker;
