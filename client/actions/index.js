import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS'

function requestData() {
  return {
    type: REQUEST_DATA,
    data: []
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

function performFetchDetails(id) {
  return dispatch => {
    return fetch(`http://localhost:8080/api/details/${id}`)
    .then(response => response.json())
    .then(json => dispatch(receiveDetails(id, json)))
  }  
}

function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data: data
  }
}

function receiveDetails(id, details) {
  return {
    type: RECEIVE_DETAILS,
    id: id,
    details: details
  }
}

export function fetchData(data) {
  return (dispatch, getState) => {
    let state = getState();   
    if (!state.loadData.data || !state.loadData.data.length)
      return dispatch(performFetchData());    
  }
}

export function fetchDetails(id) {
  return (dispatch, getState) => {
    let state = getState();    
    let dataElement = findDataElementById(id, state.loadData.data);
    if (!dataElement || !dataElement.details)
      return dispatch(performFetchDetails(id));    
  }
}

export function findDataElementById(id, data) {
  for (let current of data) {
    if (current.id === id)
      return current;    
  }
}