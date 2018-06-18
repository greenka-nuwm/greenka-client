import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLOR, ListItem } from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TREES_STATES } from '../../../consts/appConsts';

const styles = StyleSheet.create({
  text: {
    flexWrap: 'wrap',
    fontSize: 16,
    color: COLOR.black,
  },
});

const TreesList = ({ trees, goToMap }) => (
  <ScrollView>
    {trees.map((tree, index) => (
      <ListItem
        divider
        key={`tree-${index}`}
        style={{ container: { marginVertical: 5 } }}
        leftElement={
          <MaterialCommunityIcon
            name="tree"
            size={24}
            color={TREES_STATES[tree.tree_state - 1].color}
          />
        }
        centerElement={
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>{tree.address}</Text>
          </View>
        }
        onPress={goToMap(tree, 'tree')}
      />
    ))}
  </ScrollView>
);

TreesList.propTypes = {
  trees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tree_state: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
  goToMap: PropTypes.func.isRequired,
};

export default TreesList;
