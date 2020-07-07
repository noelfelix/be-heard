/* istanbul ignore file */

// Build the state object in stages by progressively adding state attributes in each stage.
// Later stages can use prior stage's state.

// Params: Similar to combineReducers a simple object with each key
// being a state namespace and each value being a reducer function.

// Example:
// const reducer = pipelineReducers({ a: aReducer, b: bReducer, c: cReducer })
//
// reducer is now a reducer function where:
//   1. aReducer will run with 3 parameters, it's prior state, the action, and the
//      'nextState' object which is an empty object.
//   2. The result of aReducer will be added to the 'nextState' object
//   2. bReducer will then run with the same 3 params but now 'nextState' has the 'a' attribute.
//   2. cReducer will then run with the same 3 params but now 'nextState' has the 'a' & 'b' attributes.
//   3. The final result will be an object of shape { a, b, c }

import { Action } from '../interface/Action'

function pipelineReducers(reducerShape: any) {
  // Similar to combineReducers we're building a reducer function
  return function reducer(state: any = {}, action: Action) {
    let nextState = state

    // For each stage and for each namespace in each stage
    Object.keys(reducerShape).forEach((namespace) => {
      const namespaceReducer = reducerShape[namespace]

      // Each subreducer expects to be run with 3 parameters (as opposed to a typical
      // reducers 2).
      // 1. It's prior state (namespaced from the full 'state')
      // 2. The action
      // 3. The full 'nextState'built so far
      const nextNamespaceState = namespaceReducer(state[namespace], action, nextState)

      // Ensure simple equality can discern change in nextState
      if (nextNamespaceState !== nextState[namespace]) {
        nextState = {
          ...nextState,
          [namespace]: nextNamespaceState,
        }
      }
    })
    return nextState
  }
}

export default pipelineReducers
