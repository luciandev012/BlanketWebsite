const BASE_URL = "https://localhost:7011";
//const BASE_URL = "http://localhost:5150";
//const BASE_URL = "http://blanketwebsite.runasp.net";

export const getImageUrl = (imageName) => {
  return `${BASE_URL}/upload/images/${imageName}`;
};
