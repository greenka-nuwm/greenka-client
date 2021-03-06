import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLOR, ListItem } from 'react-native-material-ui';
import { PROBLEMS_ICONS } from '../../../consts/appConsts';

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: COLOR.black,
  },
});

const ProblemsList = ({ problems, goToMap }) => (
  <ScrollView>
    {problems.map((problem, index) => (
      <ListItem
        divider
        key={`problem-${index}`}
        style={{ container: { marginVertical: 5 } }}
        leftElement={
          Object.keys(PROBLEMS_ICONS).includes(problem.problem_type.name)
            ? PROBLEMS_ICONS[problem.problem_type.name].icon
            : PROBLEMS_ICONS.other.icon
        }
        centerElement={
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>{problem.address}</Text>
          </View>
        }
        onPress={goToMap(problem, 'problem')}
      />
    ))}
  </ScrollView>
);

ProblemsList.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      problem_type: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        verbose_name: PropTypes.string,
        description: PropTypes.string,
      }),
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
  goToMap: PropTypes.func.isRequired,
};

export default ProblemsList;
