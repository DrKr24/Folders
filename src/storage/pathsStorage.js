const pathsKey = "paths";

export const getAllowPaths = () => {
  const result = (JSON.parse(localStorage.getItem(pathsKey)) || []).concat([
    "/",
  ]);
  return result;
};

export const addAllowPath = (path) => {
  const result = JSON.parse(localStorage.getItem(pathsKey)) || [];
  localStorage.setItem(pathsKey, JSON.stringify([...result, path]));
};

export const removeAllowPath = (path) => {
  const paths = JSON.parse(localStorage.getItem(pathsKey));
  const filteredPaths = paths
    .filter((currentPath) => currentPath !== path)
    .filter((currentPath) => !currentPath.includes(path));
  const result = JSON.stringify(filteredPaths);
  localStorage.setItem(pathsKey, result);
};
