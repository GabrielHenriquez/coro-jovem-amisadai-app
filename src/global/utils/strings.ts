export const getInitials = (name: string): string => {
  if (!name) return "";

  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  const firstInitial = names[0].charAt(0).toUpperCase();
  const secondInitial = names[1].charAt(0).toUpperCase();

  return `${firstInitial}${secondInitial}`;
};
