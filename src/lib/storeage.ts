export interface LocalStorageData {
    accessToken: string;
    messages: string;
    statusCode: number;
    success: boolean;
  }

export function setLocalStorage(key: string, data: LocalStorageData): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key: string): LocalStorageData | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
