import { number, shape, string } from 'prop-types';

export const locationType = shape({
  latitude: number.isRequired,
  longitude: number.isRequired,
  latitudeDelta: number.isRequired,
  longitudeDelta: number.isRequired,
});

export const objectType = shape({
  id: number,
  value: string,
});
