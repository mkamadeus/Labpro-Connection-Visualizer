export interface CitizenData {
  id: string;
  name: string;
  element: ElementBending;
}

export interface CitizenDataWithFriends extends CitizenData {
  friends: CitizenData[];
}

export enum ElementBending {
  water = 'water',
  earth = 'earth',
  fire = 'fire',
  air = 'air',
}
