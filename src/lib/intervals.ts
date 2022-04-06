export const intervals = {
  hunger: 18000,
  loneliness: 27000,
  dirtiness: 43200,
};

export const getNow = () => {
  return Math.round(Date.now() / 1000);
};

export const getAge = (birthTime: number) => {
  return getNow() - birthTime;
};
