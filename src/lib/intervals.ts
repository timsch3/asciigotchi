export const intervals = {
  // change for testing
  hunger: 18000, // 5 hours: 18000
  loneliness: 27000, // 7.5 hours: 27000
  dirtiness: 43200, // 12 hours 43200
};

export const getNow = () => {
  return Math.round(Date.now() / 1000);
};

export const getAge = (birthTime: number) => {
  return getNow() - birthTime;
};
