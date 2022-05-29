export default class WorkerBuilder extends Worker {
  constructor(worker) {
    const code = worker.toString();
    // code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
    // const blob = new Blob([code], { type: "application/javascript" });
    const blob = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blob));
  }
}
