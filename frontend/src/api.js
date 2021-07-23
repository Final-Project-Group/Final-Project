/**WHERE WE DO ALL OF OUR BACKEND CONNECTIONS */

import axios from "axios";

console.log(process.env);

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://toro-plate.herokuapp.com/api"
    : `http://localhost:5000/api`;
console.log(serverUrl);
const createHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

const actions = {
  getDetail: async (props) => {
    return axios.get(
      `${serverUrl}/get-event-details/${props.match.params.dynamicId}`,
      createHeaders()
    );
  },
  editEvent: async (event) => {
    let res = await axios.post(
        `${serverUrl}/edit-event`,
        event,
        createHeaders()
      );
      return res;
  },
  getUser: async () => {
    return await axios.get(`${serverUrl}/get-the-user`, createHeaders());
  },
  addDetails: async (user) => {
    let res = await axios.post(
      `${serverUrl}/add-details`,
      user,
      createHeaders()
    );
    return res;
  },
  joinEvent: async (event) => {
    let res = await axios.post(
      `${serverUrl}/join-event`,
      event,
      createHeaders()
    );
    return res;
  },
  addEvent: async (event) => {
    let res = await axios.post(
      `${serverUrl}/add-event`,
      event,
      createHeaders()
    );
    return res;
  },
  addPost: async (post) => {
    let res = await axios.post(`${serverUrl}/add-post`, post, createHeaders());
    return res;
  },
  getEvents: async (post) => {
    return await axios.get(`${serverUrl}/all-the-events`, createHeaders());
  },

  authenticate: async (profileObj) => {
    console.log(profileObj, "profileObj");
    let res = await axios.post(
      `${serverUrl}/authenticate`,
      profileObj,
      createHeaders()
    );
    console.log(res);
    localStorage.setItem("token", res.data.token);
    return res;
  },
};

export default actions;
