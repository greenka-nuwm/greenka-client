import { NavigationActions } from 'react-navigation';

class NavigationService {
  static setTopLevelNavigator(navigator) {
    NavigationService.navigator = navigator;
  }

  static goToHome() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'Home' }));
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

  static goToAddResponse() {
    NavigationService.navigator
      .dispatch(NavigationActions.navigate({ routeName: 'AddResponse' }));
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
}

export default NavigationService;
