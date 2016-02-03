import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function requestData() {
  return {
    type: REQUEST_DATA
  }
}

function performFetchData() {
  return dispatch => {
    dispatch(requestData())
    return fetch('http://localhost:8080/api/data')
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)))
  }  
}

function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data: data
  }
}

export function fetchData(data) {
  return (dispatch, getState) => {
    let state = getState();
    if (!state.data)
      return dispatch(performFetchData());    
  }
}