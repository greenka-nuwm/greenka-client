import { DrawerActions, NavigationActions } from 'react-navigation';

class NavigationService {
  static setAppNavigator(navigator) {
    NavigationService.navigator = navigator;
  }

  static closeDrawer() {
    NavigationService.navigator.dispatch(DrawerActions.closeDrawer());
  }

  static goToHome(location) {
    if (location != null) {
      NavigationService.navigator.dispatch(NavigationActions.navigate({
        routeName: 'Home',
        params: { location },
      }));
    } else {
      NavigationService.navigator
        .dispatch(NavigationActions.navigate({ routeName: 'Home' }));
    }
  }

  static goToPlaces() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Places' }));
  }

  static goToAddTree() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'AddTree' }));
  }

  static goToAddProblem() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'AddProblem' }));
  }

  static goToInfo() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Info' }));
  }

  static goToAddFeedback() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'AddFeedback' }));
  }

  static goToTreeView(id) {
    NavigationService.navigator.dispatch(NavigationActions.navigate({
      routeName: 'TreeView',
      params: { id },
    }));
  }

  static goToProblemView(id) {
    NavigationService.navigator.dispatch(NavigationActions.navigate({
      routeName: 'ProblemView',
      params: { id },
    }));
  }

  static goToEnter() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Enter' }));
  }

  static goToLogin() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }

  static goToRegister = () => {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Register' }));
  };
}

export default NavigationService;
