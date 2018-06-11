import { COLOR } from 'react-native-material-ui';

export const LOCATION = {
  latitude: 48.379433,
  longitude: 31.16557990000001,
  latitudeDelta: 18,
  longitudeDelta: 18,
};

export const ACTIVE_FILTERS = [
  'healthy',
  'broken',
  'dying',
  'dry',
  'toping',
  'mistletoe',
];

export const TREES_FILTERS = [
  {
    key: 'healthy',
    icon: 'tree',
    label: 'Здорові',
    color: COLOR.green600,
  },
  {
    key: 'broken',
    icon: 'tree',
    label: 'Пошкоджені',
    color: COLOR.yellow600,
  },
  {
    key: 'dying',
    icon: 'tree',
    label: 'Помирають',
    color: COLOR.red600,
  },
  {
    key: 'dry',
    icon: 'tree',
    label: 'Напівсухі та сухі',
    color: COLOR.black,
  },
  {
    key: 'toping',
    icon: 'tree',
    label: 'Топінг',
    color: COLOR.purple600,
  },
  {
    key: 'mistletoe',
    icon: 'tree',
    label: 'Вражені омелою',
    color: COLOR.blue600,
  },
];
