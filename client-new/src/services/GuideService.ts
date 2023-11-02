import axios from "axios";
//"api/users/:uid"

export const getGuide = async (guideName: String) => {
  const res = await axios.get(`http://localhost:8080/api/guides/${guideName}`);
  return res.data;
};
