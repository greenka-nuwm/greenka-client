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

export const TREES_STATES = [
  {
    id: 0,
    key: 'healthy',
    icon: 'tree',
    label: 'Здорові',
    value: 'Здорове',
    color: COLOR.green600,
  },
  {
    id: 1,
    key: 'broken',
    icon: 'tree',
    label: 'Пошкоджені',
    value: 'Пошкоджене',
    color: COLOR.yellow600,
  },
  {
    id: 2,
    key: 'dying',
    icon: 'tree',
    label: 'Помирають',
    value: 'Помирає',
    color: COLOR.red600,
  },
  {
    id: 3,
    key: 'dry',
    icon: 'tree',
    label: 'Напівсухі та сухі',
    value: 'Напівсухе або сухе',
    color: COLOR.orange600,
  },
  {
    id: 4,
    key: 'toping',
    icon: 'tree',
    label: 'Топінг',
    value: 'Топінг',
    color: COLOR.purple600,
  },
  {
    id: 5,
    key: 'mistletoe',
    icon: 'tree',
    label: 'Вражені омелою',
    value: 'Вражене омелою',
    color: COLOR.blue600,
  },
];
