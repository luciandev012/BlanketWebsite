const BASE_URL = "https://localhost:7011";
//const BASE_URL = "http://localhost:5150";
//const BASE_URL = "http://aircondition.runasp.net";

export const getImageUrl = (imageName) => {
  return `${BASE_URL}/upload/images/${imageName}`;
};
