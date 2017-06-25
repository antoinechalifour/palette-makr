import './reset.css'
import EventEmitter from 'events'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const emitter = new EventEmitter()

ReactDOM.render(<App emitter={emitter} />, document.getElementById('root'))
registerServiceWorker(emitter)
