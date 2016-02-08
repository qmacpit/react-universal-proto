import { combineReducers } from 'redux'
import {  
  REQUEST_DATA, RECEIVE_DATA, RECEIVE_DETAILS, findDataElementById
} from '../actions'

// function data(state = {
//   data: []
// }, action) {
//   switch (action.type) {
//     case REQUEST_DATA:
//     case RECEIVE_DATA:
//       return Object.assign({}, state)
//     default:
//       return state
//   }  
// }

function loadData(state = {}, action) {  
  switch (action.type) {
    case REQUEST_DATA:
      return {
        data: []
      };
    case RECEIVE_DATA:
      return {
        data: action.data
      };
    case RECEIVE_DETAILS:
      console.log('details received')
      console.log(state)
      console.log(action)      
      let _data = state.data.slice(0);
      let index = findIndexById(action.id, _data);
      if (index !== -1) {
        _data[index].details = action.details;
        return {
          data: _data          
        };
      }      
      // return Object.assign({}, state, {
      //   [action.data]: data(data[action.data], action)
      // })
    default:
      return state
  }  
}

function findIndexById(id, data) {
  let i = 0, l = data.length, current;
  for (; i < l; i++) {
    if (data[i].id === id)
      return i;
  }
  return -1;
}

const dataReducer = combineReducers({
  loadData
})

export default dataReducer
