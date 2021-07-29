/**WHERE WE DO ALL OF OUR BACKEND CONNECTIONS */

import axios from "axios";

console.log(process.env);

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://jogo-final-project.herokuapp.com/api"
    : `http://localhost:5000/api`;
console.log(serverUrl);
const createHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

const actions = {
  // getGeocoding: async (props) => {

  //   let res = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=29+champs+elys%C3%A9e+paris&key=AIzaSyAf6-uRnVV8NM67T9FobkbcynWfDGe-0oY`,
  //     props,
  //     createHeaders()
  //   );
  //   console.log(res)
  //   return res
  // },

  leaveEvent: async (event) => {
    let res = await axios.post(
      `${serverUrl}/leave-event`,
      event,
      createHeaders()
    );
    return res;
  },
  getDetail: async (props) => {
    let res = await axios.get(
      `${serverUrl}/get-event-details/${props.match.params.dynamicId}`,
      props,
      createHeaders()
    );
    console.log(res);
    return res;
  },
  editEvent: async (event) => {
    let res = await axios.post(
      `${serverUrl}/edit-event`,
      event,
      createHeaders()
    );
    return res;
  },
  deleteEvent: async (event) => {
    let res = await axios.post(
      `${serverUrl}/delete-event`,
      event,
      createHeaders()
    );
    return res;
  },
  // Create user with email
  createUser: async (user) => {
    return await axios.post(`${serverUrl}/create-user`, user, createHeaders());
  },
  getUser: async () => {
    return await axios.get(`${serverUrl}/get-the-user`, createHeaders());
  },

  // These two are broken / incomplete ATM
  getAllUsers: async () => {
    return await axios.get(`${serverUrl}/get-all-users`, createHeaders());
  },
  signupUser: async (email) => {
    return await axios.get(`${serverUrl}/signup-user`, createHeaders());
  },
  // loginUser: async (credentials) => {
  //   return fetch(`${serverUrl}/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //     .then(data => data.json())
  //  },

  // Add details to event
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
    console.log(res);
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
  deletePost: async (post) => {
    let res = await axios.post(`${serverUrl}/delete-post`, post, createHeaders());
    return res;
  },
  getAllPosts: async (post) => {
    return await axios.get(`${serverUrl}/all-the-posts`, createHeaders());
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
