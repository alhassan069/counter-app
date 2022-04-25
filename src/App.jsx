import { useState, useEffect } from "react";
import "./App.css";
import { Counter } from "./components/Counter";
const App = () => {
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_VALUE = process.env.MAX_VALUE || 1000;
  function numberChange(e) {
    if (+e.target.value <= MAX_VALUE) {
      setCounter(+e.target.value);
      setIsLoading(true);
      updatePost();
    } else {
      setCounter(MAX_VALUE);
      setIsLoading(true);
      updatePost();
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/alimul.json`
      );
      // const response = await fetch("http://localhost:5001");
      let actualData = await response.json();
      setCounter(actualData.alimul || 1);
      console.log(actualData);
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, []);
  async function updatePost() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alimul: counter }),
    };
    const response = await fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
      requestOptions
    );
    // const response = await fetch("http://localhost:5001", requestOptions);
    const data = await response.json();
    console.log("put", data.alimul);
    setIsLoading(false);
  }
  const changeCounter = (num) => {
    if (counter + num <= MAX_VALUE) {
      setCounter(counter + num);
      setIsLoading(true);
      updatePost();
    } else {
      setCounter(MAX_VALUE);
      setIsLoading(true);
      updatePost();
    }
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="loadingCont">
            {isLoading && (
              <span className="loading">
                <div className="circle"></div>
                <p className="loading-text">Saving Counter Value</p>
              </span>
            )}
          </div>

          <div className="button">
            <div onClick={() => changeCounter(-1)}>-</div>
            <input
              type="number"
              onChange={(e) => numberChange(e)}
              // placeholder={counter}
              value={counter}
            />

            <div onClick={() => changeCounter(+1)}>+</div>
          </div>
          <Counter counter={counter} />
        </div>
      </div>
    </>
  );
};
export default App;
