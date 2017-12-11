const toastMiddleware = store => next => action => {
  if (action.error) {
    vanillatoasts.create({ text: action.error.toString(), timeout: 5000 });
  }
  next(action);
};
