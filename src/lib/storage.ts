export const save = (name: string, value: number) => {
  localStorage.setItem(`localgotchi-${name}`, String(value));
};

export const load = (name: string): number | undefined => {
  let data = localStorage.getItem(`localgotchi-${name}`);
  if (data !== null || undefined) return Number(data);
};
