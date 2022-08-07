const secondsToHms = (s: number) => ({
  hours: ((s - (s % 3600)) / 3600) % 60,
  minutes: ((s - (s % 60)) / 60) % 60,
  seconds: s % 60,
});

export const toHHMMSS = (seconds: number) => {
  const { hours, minutes, seconds: sec } = secondsToHms(seconds);
  return `${hours}:${minutes}:${Math.floor(sec)}`;
};
