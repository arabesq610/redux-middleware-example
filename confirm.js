const confirmationMiddleware = store => next => action => {
  if (action.shouldConfirm) {
    if (confirm('Are you sure?')) {
      next(action);
    }
  } else {
    next(action);
  }
};
