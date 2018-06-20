import React from 'react';
import { COLOR } from 'react-native-material-ui';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const API_URL = 'http://192.168.0.55:8000';

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
  'illegal-dumping',
  'bad-street-lighting',
  'open-sewer-hatch',
  'bad-ramp',
  'failing-trees',
  'illegal-graffiti',
  'pothole',
  'bad-road-surface-health',
  'road-sign-problems',
  'broken-traffic-light',
  'bag-road-marking',
  'storm-sewerage-problems',
  'playground-poor-state',
  'fire-exit-block',
  'other',
];

export const TREES_STATES = [
  {
    key: 'healthy',
    icon: 'tree',
    label: 'Здорові',
    value: 'Здорове',
    color: COLOR.green600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.green600),
  },
  {
    key: 'broken',
    icon: 'tree',
    label: 'Пошкоджені',
    value: 'Пошкоджене',
    color: COLOR.yellow600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.yellow600),
  },
  {
    key: 'dying',
    icon: 'tree',
    label: 'Помирають',
    value: 'Помирає',
    color: COLOR.red600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.red600),
  },
  {
    key: 'dry',
    icon: 'tree',
    label: 'Напівсухі та сухі',
    value: 'Напівсухе або сухе',
    color: COLOR.orange600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.orange600),
  },
  {
    key: 'toping',
    icon: 'tree',
    label: 'Топінг',
    value: 'Топінг',
    color: COLOR.purple600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.purple600),
  },
  {
    key: 'mistletoe',
    icon: 'tree',
    label: 'Вражені омелою',
    value: 'Вражене омелою',
    color: COLOR.blue600,
    getImageSource: () => MaterialCommunityIcons.getImageSource('tree', 26, COLOR.blue600),
  },
];

export const PROBLEMS_ICONS = {
  'illegal-dumping': {
    color: COLOR.indigo600,
    icon: <Ionicons size={22} name="md-trash" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => Ionicons.getImageSource('md-trash', 26, COLOR.indigo600),
  },
  'bad-street-lighting': {
    color: COLOR.indigo600,
    icon: <FontAwesome size={22} name="lightbulb-o" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => FontAwesome.getImageSource('lightbulb-o', 26, COLOR.indigo600),
  },
  'open-sewer-hatch': {
    color: COLOR.indigo600,
    icon: <MaterialCommunityIcons size={22} name="currency-sign" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialCommunityIcons.getImageSource('currency-sign', 26, COLOR.indigo600),
  },
  'bad-ramp': {
    color: COLOR.indigo600,
    icon: <MaterialIcons size={22} name="signal-cellular-null" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialIcons.getImageSource('signal-cellular-null', 26, COLOR.indigo600),
  },
  'failing-trees': {
    color: COLOR.indigo600,
    icon: <MaterialCommunityIcons size={22} name="pine-tree" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialCommunityIcons.getImageSource('pine-tree', 26, COLOR.indigo600),
  },
  'illegal-graffiti': {
    color: COLOR.indigo600,
    icon: <MaterialIcons size={22} name="gradient" style={{ color: COLOR.indigo600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialIcons.getImageSource('gradient', 26, COLOR.indigo600),
  },
  pothole: {
    color: COLOR.cyan600,
    icon: <FontAwesome size={22} name="exclamation-triangle" style={{ color: COLOR.cyan600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => FontAwesome.getImageSource('exclamation-triangle', 26, COLOR.cyan600),
  },
  'bad-road-surface-health': {
    color: COLOR.cyan600,
    icon: <Entypo size={22} name="area-graph" style={{ color: COLOR.cyan600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => Entypo.getImageSource('area-graph', 26, COLOR.cyan600),
  },
  'road-sign-problems': {
    color: COLOR.cyan600,
    icon: <MaterialCommunityIcons size={22} name="sign-caution" style={{ color: COLOR.cyan600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialCommunityIcons.getImageSource('sign-caution', 26, COLOR.cyan600),
  },
  'broken-traffic-light': {
    color: COLOR.cyan600,
    icon: <MaterialIcons size={22} name="traffic" style={{ color: COLOR.cyan600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialIcons.getImageSource('traffic', 26, COLOR.cyan600),
  },
  'bag-road-marking': {
    color: COLOR.cyan600,
    icon: <FontAwesome size={22} name="road" style={{ color: COLOR.cyan600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => FontAwesome.getImageSource('road', 26, COLOR.cyan600),
  },
  'storm-sewerage-problems': {
    color: COLOR.deepOrange600,
    icon: <MaterialIcons size={22} name="filter-list" style={{ color: COLOR.deepOrange600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialIcons.getImageSource('filter-list', 26, COLOR.deepOrange600),
  },
  'playground-poor-state': {
    color: COLOR.deepOrange600,
    icon: <Ionicons size={22} name="ios-football" style={{ color: COLOR.deepOrange600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => Ionicons.getImageSource('ios-football', 26, COLOR.deepOrange600),
  },
  'fire-exit-block': {
    color: COLOR.deepOrange600,
    icon: <MaterialCommunityIcons size={22} name="fire-truck" style={{ color: COLOR.deepOrange600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialCommunityIcons.getImageSource('fire-truck', 26, COLOR.deepOrange600),
  },
  other: {
    color: COLOR.deepOrange600,
    icon: <MaterialIcons size={22} name="place" style={{ color: COLOR.deepOrange600, width: 22, textAlign: 'center' }} />,
    getImageSource: () => MaterialIcons.getImageSource('place', 26, COLOR.deepOrange600),
  },
};
