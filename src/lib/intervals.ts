export const intervals = {
  // change for testing
  hunger: 18000, // 5 hours: 18000
  loneliness: 27000, // 7.5 hours: 27000
  dirtiness: 43200, // 12 hours 43200
};

export const getNow = () => {
  return Math.round(Date.now() / 1000);
};

export const getHunger = (lastFed: number): number => {
  const value = Math.floor(((getNow() - lastFed) / intervals.hunger) * 5);
  if (value <= 5) return value;
  else return 5;
};

export const getLoneliness = (lastPetted: number): number => {
  const value = Math.floor(((getNow() - lastPetted) / intervals.loneliness) * 5);
  if (value <= 5) return value;
  else return 5;
};

export const getDirtiness = (lastCleaned: number): number => {
  const value = Math.floor(((getNow() - lastCleaned) / intervals.dirtiness) * 5);
  if (value <= 5) return value;
  else return 5;
};

export const getIsHungry = (lastFed: number): boolean => {
  return getNow() - lastFed > intervals.hunger;
};

export const getIsLonely = (lastPetted: number): boolean => {
  return getNow() - lastPetted > intervals.loneliness;
};

export const getIsDirty = (lastCleaned: number): boolean => {
  return getNow() - lastCleaned > intervals.dirtiness;
};
