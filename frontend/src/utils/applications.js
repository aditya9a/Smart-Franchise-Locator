const STORAGE_KEY = "franchise_applications";

export function getApplications() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function addApplication(application) {
  const existing = getApplications();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, application])
  );
}

export function updateApplicationStatus(id, status) {
  const apps = getApplications().map((app) =>
    app.id === id ? { ...app, status } : app
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}
