/**
 *  @method  promiseMiddleware
 *  @return  {[type]}
 */
function promiseMiddleware () {
  return next => action => {
    const {promise, type, ...rest} = action;

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    if (!promise) {
      return next(action);
    }

    next({...rest, type: REQUEST});

    return promise
    .then((res) => {
      next({...rest,
        data: res,
        type: SUCCESS
      });
      return true;
    }, (error) => {
      console.log('request-error ====>', error);
      next({...rest, error, type: FAILURE});
      return false;
    });
  }
}

export {
  promiseMiddleware
}
