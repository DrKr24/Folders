const settingsKey = "settings";

export const getFolderSettings = () => {
  const data = JSON.parse(localStorage.getItem(settingsKey)) || {};
  if (!data["/"]) {
    localStorage.setItem(
      settingsKey,
      JSON.stringify({
        ...data,
        "/": { view: "list", sort: { by: "name", ordering: "ascending" } },
      })
    );
    return JSON.parse(localStorage.getItem(settingsKey));
  }
  return data;
};

export const setFolderSettings = (path, data) => {
  const settingsData = JSON.parse(localStorage.getItem(settingsKey));
  if (!settingsData) {
    return localStorage.setItem(settingsKey, JSON.stringify({ [path]: data }));
  }
  const isHasPath = settingsData[path];
  if (!isHasPath) {
    return localStorage.setItem(
      settingsKey,
      JSON.stringify({ ...settingsData, [path]: data })
    );
  }
  return localStorage.setItem(
    settingsKey,
    JSON.stringify({ ...settingsData, [path]: data })
  );
};

export const removeFolderSettings = (folderPath) => {
  const settingsData = JSON.parse(localStorage.getItem(settingsKey));
  const filtredSettings = Object.fromEntries(
    Object.entries(settingsData)
      .filter((item) => item[0] !== folderPath)
      .filter((item) => !item[0].includes(folderPath))
  );
  localStorage.setItem(settingsKey, JSON.stringify(filtredSettings));
};
