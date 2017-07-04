import { AppNavigator } from '../app_navigation_state';

export default function (state, action) {
  //Workaround to prevent navigating twice on the same screen when clicking a button quickly
  if (action.type.startsWith('Navigation/')) {
    const { routeName } = action;
    const lastRoute = state.routes[state.routes.length - 1];
    if (routeName === lastRoute.routeName) {
      console.warn("Prevent navigating twice on the same screen, nav reducer");
      return state;
    }
  }

  return AppNavigator.router.getStateForAction(action, state) || state;
}