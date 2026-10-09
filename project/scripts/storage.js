const STORAGE_KEY = 'undergroundArchiveCrate';

export function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function isSaved(id) {
  return getSavedIds().includes(id);
}

export function toggleSaved(id) {
  const saved = new Set(getSavedIds());
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);
  const ids = [...saved];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  return ids;
}
