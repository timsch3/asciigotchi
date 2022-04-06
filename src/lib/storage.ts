let allItems = new Set<string>();

export const save = (name: string, value: number) => {
  localStorage.setItem(`asciigotchi-${name}`, String(value));
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
