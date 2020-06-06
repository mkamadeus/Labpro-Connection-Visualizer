interface CitizenData {
  id: number;
  name: string;
  element: ElementBending;
}

enum ElementBending {
  water = 'water',
  earth = 'earth',
  fire = 'fire',
  air = 'air',
}
