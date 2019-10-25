import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import allReducers from './reducers'

export const storage = createStore(allReducers)
