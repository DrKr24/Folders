const foldersKey = "folders";

export const getFolders = () => {
  const result = JSON.parse(localStorage.getItem(foldersKey)) || { "/": [] };
  return result;
};

export const addFolder = (path, newPath, folder) => {
  const folders = JSON.parse(localStorage.getItem(foldersKey));
  if (!folders) {
    return localStorage.setItem(
      foldersKey,
      JSON.stringify({ [path]: [folder], [newPath]: [] })
    );
  }
  const folderData = folders[path];
  if (folderData) {
    return localStorage.setItem(
      foldersKey,
      JSON.stringify({
        ...folders,
        [path]: [folder, ...folderData],
        [newPath]: [],
      })
    );
  }
  localStorage.setItem(
    foldersKey,
    JSON.stringify({ ...folders, [path]: [folder], [newPath]: [] })
  );
};

export const editFolder = (path, name, id) => {
  const folders = JSON.parse(localStorage.getItem(foldersKey));
  localStorage.setItem(
    foldersKey,
    JSON.stringify({
      ...folders,
      [path]: folders[path].map((folder) =>
        folder.id === id ? { ...folder, name: name } : folder
      ),
    })
  );
};

export const removeFolder = (path, folderPath, id) => {
  const folders = JSON.parse(localStorage.getItem(foldersKey));
  const filteredFolders = Object.fromEntries(
    Object.entries(folders)
      .filter((item) => item[0] !== folderPath)
      .filter((item) => !item[0].includes(folderPath))
  );
  const result = JSON.stringify({
    ...filteredFolders,
    [path]: filteredFolders[path].filter((folder) => folder.id !== id),
  });
  localStorage.setItem(foldersKey, result);
};
