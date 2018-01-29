import React from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { addNavigationHelpers } from 'react-navigation';

import Navigator from './screens/Navigator';

const navReducer = (state, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
});

const store = createStore(appReducer);

const mapStateToProps = (state) => ({
  nav: state.nav
});

const Root = ({ dispatch, nav }) => {
  return (
    <Navigator navigation={addNavigationHelpers({
      dispatch: dispatch,
      state: nav,
    })} />
  );
};

const AppWithNavigationState = connect(mapStateToProps)(Root);

export default App = () => {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
};
