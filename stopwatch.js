const redux = require('redux');

const timerMiddleware = store => next => action => {
  if (action.type === 'START_TIMER') {
    action.interval = setInterval(() => store.dispatch({ type: 'TICK', currentTime: Date.now() }), 1000);
  } else if (action.type === 'STOP_TIMER') {
    clearInterval(action.interval);
  }
  next(action);
};

const stopwatch = ((state = {}),
action => {
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
  }
  return state;
});

const middleware = redux.applyMiddleware(timerMiddleware);
const store = redux.createStore(stopwatch, middleware);
