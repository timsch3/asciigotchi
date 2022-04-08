let allItems = new Set<string>(); // for resetting only asciigotchi local storage data

export const save = (name: string, value: number) => {
  localStorage.setItem(`asciigotchi-${name}`, String(value));
  if (name === 'darkmode') return; // don't reset darkmode setting
  allItems.add(`asciigotchi-${name}`);
};

export const load = (name: string): number | undefined => {
  let data = localStorage.getItem(`asciigotchi-${name}`);
  if (data !== null || undefined) return Number(data);
};

export const reset = () => {
  allItems.forEach(item => {
    localStorage.removeItem(item);
  });
};
