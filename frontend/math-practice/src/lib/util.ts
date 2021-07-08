export function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function timeDiff(start: Date, end?: Date): number {
  if (!end) {
    end = new Date();
  }
  return end.getTime() - start.getTime();
}

export function formatSeconds(miliseconds: number, sigFig = 1): string {
  return (miliseconds / 1000).toFixed(sigFig) + "s";
}

export function formatMinutesSeconds(miliseconds: number, sigFig = 1): string {
  const totalSeconds = miliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const padZero = seconds < 10 ? "0" : "";
  return minutes + ":" + padZero + seconds.toFixed(sigFig);
}
