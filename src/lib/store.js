import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

declare var module: any;

export default function configureStore() {
  const reducer = require("../reducers").default;
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  if (module.hot) {
    const acceptCallback = () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    };

    module.hot.accept("./reducers", acceptCallback);
    module.hot.acceptCallback = acceptCallback;
  }

  return store;
}
