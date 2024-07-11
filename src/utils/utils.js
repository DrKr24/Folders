import dayjs from "dayjs";

export const isEmptyString = (string) => {
  if (typeof string !== "string") return true;
  if (!string.length) return true;
  return false;
};

export const getNewFolderObject = (foldersData, location) => {
  const now = dayjs();
  const path = `/New_Folder${Date.now()}`;
  return {
    id: Date.now(),
    name: `New Folder`,
    date: now.format("DD.MM.YYYY HH:mm"),
    path: path,
    parentPath: location,
    fullpath: pathNormalize(`${location}${path}`),
    type: "files folder",
    settings: {},
  };
};

export const pathNormalize = (path) =>
  path[0] === path[1] ? path.substring(1) : path;

export const sortHandler = (array, by = "name", ordering = "ascending") => {
  const data = [...array];
  if (by === "date") {
    if (ordering === "ascending") {
      data.sort((a, b) => a.id - b.id);
    }
    if (ordering === "descending") {
      data.sort((a, b) => b.id - a.id);
    }
    return data;
  }
  if (by === "name") {
    if (ordering === "ascending") {
      data.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
    if (ordering === "descending") {
      data.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }
    return data;
  }
  return array;
};

export const searchHandler = (array, string) => {
  if (!array.length) {
    return array;
  }
  return array.filter((item) =>
    item.name.toLowerCase().includes(string.toLowerCase())
  );
};

export const getBreakPoints = (pathname) => {
  const breakPoints = pathname.split("/").map((string) => "/" + string);
  const breakPointsNames = pathname
    .split("/")
    .filter((string) => string.length);
  return { breakPoints, breakPointsNames };
};

export const getUrls = (path, array) => {
  let currentPath = path;
  let currentArray = [...array];
  let result = [];

  while (currentArray.length > 0) {
    result.push(currentPath);
    const breakPoint = currentArray.pop();
    currentPath = currentPath.replace(breakPoint, "");
  }

  return Array.from(
    new Set(result.map((string) => (!string.length ? "/" : string)))
  ).reverse();
};
