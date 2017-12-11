const redux = require('redux');

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
  }
  return state;
};

const store = redux.createStore(counter);

store.subscribe(() => {
  console.log(store.getState());
});
console.log(store);

// store.dispatch({ type: 'INCREMENT' }); // Prints "1"
// store.dispatch({ type: 'INCREMENT' }); // Prints "2"
