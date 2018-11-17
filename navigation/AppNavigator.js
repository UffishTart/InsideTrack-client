import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  TabNavigator: TabNavigator,
});