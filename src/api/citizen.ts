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
  water: require('@material-ui/core/colors/blue').default[300],
  earth: require('@material-ui/core/colors/brown').default[300],
  fire: require('@material-ui/core/colors/red').default[300],
  air: require('@material-ui/core/colors/indigo').default[300],
};

/**
 * Make a GET request to https://avatar.labpro.dev/friends/<id> to get citizen data.
 * @param id The id of citizen requested from the API
 */
export const getCitizenData = async (
  id: string
): Promise<Required<CitizenData>> => {
  return new Promise(async (resolve, reject) => {
    if (!localStorage.getItem(`avatar_${id}`)) {
      await axios
        .get(`https://avatar.labpro.dev/friends/${id}`)
        .then((response) => {
          const data = response.data.payload as Required<CitizenData>;
          // console.log(data.friends);
          data.friends = data.friends.filter(
            (friend, index) =>
              index ===
              data.friends.findIndex((other) => other.id === friend.id)
          );
          // console.log(data.friends);
          localStorage.setItem(`avatar_${data.id}`, JSON.stringify(data));
        })
        .catch((error) => {
          // TODO : handle invalid ID
          resolve(error);
        });
    }

    resolve(
      JSON.parse(localStorage.getItem(`avatar_${id}`) as string) as Required<
        CitizenData
      >
    );
  });
};
