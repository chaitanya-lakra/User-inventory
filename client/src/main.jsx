import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalState from './context/context.jsx';

// import GlobalState from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <GlobalState>
    <App />
    </GlobalState>
</Provider>
)

