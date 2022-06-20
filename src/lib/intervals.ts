export const intervals = {
  // change for testing
  hunger: 18000, // 5 hours: 18000
  loneliness: 27000, // 7.5 hours: 27000
  dirtiness: 43200, // 12 hours: 43200
  health: 36000, // 10 hours: 36000
  sleepiness: 57600, // 16 hours: 57600
};

export const getNow = () => {
  return Math.round(Date.now() / 1000);
};

class Need {
  getAmount(lastFulfilled: number): number {
    // convert to percentage
    const value = Math.floor(((getNow() - lastFulfilled) / this.interval) * 100);
    if (value <= 100) return value;
    else return 100;
  }
  needsFulfilment(lastFulfilled: number): boolean {
    return getNow() - lastFulfilled > this.interval;
  }
  constructor(public interval: number) {}
}

export const Hunger = new Need(intervals.hunger);
export const Loneliness = new Need(intervals.loneliness);
export const Dirtiness = new Need(intervals.dirtiness);

export const getIsSick = (lastFed: number, lastPetted: number, lastCleaned: number): boolean => {
  if (
    getNow() - lastFed > intervals.hunger * 5 ||
    getNow() - lastPetted > intervals.loneliness * 4 ||
    getNow() - lastCleaned > intervals.dirtiness * 2.5
  ) {
    return true;
  } else return false;
};

export const getIsDead = (lastHealthy: number): boolean => {
  return getNow() - lastHealthy > intervals.health;
};
