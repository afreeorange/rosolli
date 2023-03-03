export const readableLength = (s: number) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - hours * 3600) / 60);
  const seconds = Math.floor(s - hours * 3600 - minutes * 60);

  if (hours === 0) {
    return [
      `${minutes < 10 ? "0" : ""}${minutes}`,
      `${seconds < 10 ? "0" : ""}${seconds}`,
    ].join(":");
  }

  return [
    `${hours < 10 ? "0" : ""}${hours}`,
    `${minutes < 10 ? "0" : ""}${minutes}`,
    `${seconds < 10 ? "0" : ""}${seconds}`,
  ].join(":");
};
