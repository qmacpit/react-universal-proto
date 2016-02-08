import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import dataReducer from '../reducers'

export default function configureStore(initialState) {

  const store = typeof window !== "undefined" 
  ? createStore(
    dataReducer,
    initialState,    
    applyMiddleware(thunkMiddleware, createLogger())
  )
  : createStore(
    dataReducer,
    initialState  
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
