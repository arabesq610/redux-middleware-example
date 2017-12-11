const redux = require('redux');

const superagent = require('superagent');

const timerMiddleware = store => next => action => {
  if (action.type === 'START_TIMER') {
    action.interval = setInterval(() => store.dispatch({ type: 'TICK', currentTime: Date.now() }), 1000);
  } else if (action.type === 'STOP_TIMER') {
    clearInterval(action.interval);
  }
  next(action);
};

const stopwatch = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return Object.assign({}, state, {
        startTime: action.currentTime,
        elapsed: 0,
        interval: action.interval
      });
    case 'TICK':
      return Object.assign({}, state, {
        elapsed: action.currentTime - state.startTime
      });
    case 'STOP_TIMER':
      return Object.assign({}, state, { interval: null });
    case 'SAVE_TIME':
      if (action.error) {
        return Object.assign({}, state, { startTime: null, elapsed: null, error: null });
      }
  }
  return state;
};

const middleware = redux.applyMiddleware(timerMiddleware);
const store = redux.createStore(stopwatch, middleware);

store.dispatch({ type: 'SAVE_TIME', payload: superagent.post('/save', store.getState()) });
