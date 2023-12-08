window.webkit = {
  messageHandlers: new Proxy(
    {},
    {
      get: (target, prop) => {
        if (!target[prop]) {
          target[prop] = {
            postMessage: (...args) => {
              webkitInterceptor(prop, args);
            },
          };
        }
        return target[prop];
      },
    }
  ),
};
