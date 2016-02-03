import { combineReducers } from 'redux'
import {  
  REQUEST_DATA, RECEIVE_DATA
} from '../actions'

function data(state = {
  data: []
}, action) {
  switch (action.type) {
    case REQUEST_DATA:
    case RECEIVE_DATA:
      return Object.assign({}, state)
    default:
      return state
  }  
}

function loadData(state = {}, action) {
  switch (action.type) {
    case REQUEST_DATA:
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        [action.data]: data(data[action.data], action)
      })
    default:
      return state
  }  
}

const dataReducer = combineReducers({
  loadData
})

export default dataReducer
