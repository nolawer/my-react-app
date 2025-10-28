import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test3, { Test, Test2, Test4, Test5, Test6, Test7 } from './Test';
import Box from './box';
import reportWebVitals from './reportWebVitals';
import Todolist from './components/Todolist';
import TodoInput from './components/TodoInput';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todolist />
    <div>
      {/* <Test name="정성훈" />
      <Test2 />
      <Test3 />
      <Test4 />
      <Test5 />

      <Test6 />

    </div>
    <div>
      <Box text="Hello" color="red" />
      <Box text="World" color="blue" />
      <Box text="React" color="green" />
    </div> */}
    
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
