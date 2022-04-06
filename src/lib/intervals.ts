export const intervals = {
  hunger: 5, // 5 hours: 18000
  loneliness: 7, // 7.5 hours: 27000
  dirtiness: 10, // 12 hours 43200
};

export const getNow = () => {
  return Math.round(Date.now() / 1000);
};

export const getAge = (birthTime: number) => {
  return getNow() - birthTime;
};
