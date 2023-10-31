export function calculateElapsedTime(dataEntry: string, dateProcessed: string): string {
    const entryTime = new Date(dataEntry).getTime();
    const processedTime = new Date(dateProcessed).getTime();
    const elapsedTimeMillis = processedTime - entryTime;
  
    const hours = Math.floor(elapsedTimeMillis / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTimeMillis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTimeMillis % (1000 * 60)) / 1000);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  