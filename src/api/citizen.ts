import axios from 'axios';

export interface CitizenData {
  id: string;
  name: string;
  element: ElementBending;
  friends?: CitizenData[];
}

/**
 * All possible bending types.
 */
export enum ElementBending {
  water = 'water',
  earth = 'earth',
  fire = 'fire',
  air = 'air',
}

/**
 * Element designated colors.
 */
export const ElementColors = {
  water: require('@material-ui/core/colors/blue').default[200],
  earth: require('@material-ui/core/colors/brown').default[200],
  fire: require('@material-ui/core/colors/red').default[200],
  air: require('@material-ui/core/colors/indigo').default[200],
};

/**
 * Make a GET request to https://avatar.labpro.dev/friends/<id> to get citizen data.
 * @param id The id of citizen requested from the API
 */
export const getCitizenData = async (
  id: string
): Promise<Required<CitizenData>> => {
  return new Promise((resolve, reject) => {
    axios.get(`https://avatar.labpro.dev/friends/${id}`).then(
      (response) => {
        resolve(response.data.payload as Required<CitizenData>);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
