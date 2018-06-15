import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { COLOR } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -10,
    marginRight: -10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const GreenkaActionButton = () => (
  <Fragment>
    <View style={styles.container}>
      <ActionButton
        buttonColor={uiTheme.palette.accentColor}
        fixNativeFeedbackRadius
      >
        <ActionButton.Item
          buttonColor={COLOR.green300}
          size={50}
          title="Внести дерево"
          onPress={NavigationService.goToAddTree}
        >
          <MaterialIcon name="local-florist" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor={COLOR.red300}
          size={50}
          title="Описати проблему"
          onPress={NavigationService.goToAddProblem}
        >
          <MaterialIcon name="report-problem" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  </Fragment>
);

export default GreenkaActionButton;
