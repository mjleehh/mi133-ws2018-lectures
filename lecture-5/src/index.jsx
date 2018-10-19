import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import App from './App'
import reducer from './reducer'
import './style.scss'

import thunk from 'redux-thunk'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main')
)
