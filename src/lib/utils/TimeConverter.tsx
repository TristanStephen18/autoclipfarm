export function findProcessingTime(seconds: number) {
  let minutes = 0;
  let hours = 0;
  let remaining_seconds = 0;

  remaining_seconds = seconds % 60;
  minutes = Math.floor(seconds / 60);
  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  return hours + " hours, " + minutes + " minutes, " + remaining_seconds + " seconds";
}