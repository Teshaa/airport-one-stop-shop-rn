export const zip = (ar1, ar2) => {
  if (
    !(ar2 instanceof Array && ar1 instanceof Array && ar1.length === ar2.length)
  )
    throw Error("Invalid argument");
  const zipped = [];
  for (let index = 0; index < ar1.length; index++) {
    zipped.push([ar1[index], ar2[index]]);
  }
  return zipped;
};
export const dict = (arr) => {
  dictionary = {};
  arr.forEach((element) => {
    dictionary[element[0]] = element[1];
  });
  return dict;
};

export const getFormFileFromMediaFile = (mediaFile) => {
  const filename = mediaFile.uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = mediaFile.type + "/" + fileExt;
  return {
    uri: mediaFile.uri,
    name: filename,
    type: mimeType,
  };
};

export const getFormFileFromUri = (uri) => {
  const filename = uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = `image/${fileExt}`;
  // const mimeType = Platform.OS === "ios" ? `image/jpg` : "image/jpeg";
  return {
    uri: uri,
    name: filename,
    type: mimeType,
  };
};

export const rangeToListInclusive = (start, end) => {
  const list = [];
  for (let index = start; index < end + 1; index++) {
    list.push(index);
  }
  return list;
};
