import axios from "axios";
import {
  LOGIN_USER,
  REG_USER,
  BUCKET_PHOTO,
  IMG_SEARCH,
  UPDATE_TAG
} from "./types";
import setAuth from "./setAuth";
/* LOGIN START */
export function setUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}
export function logout() {
  return dispatch => {
    setAuth(false);
    dispatch(setUser({}));
  };
}
/* LOGIN END */
//Route the registered user data
export const regUser = values => async dispatch => {
  console.log("test12");
  const res = await axios.post("/users/reg", values);

  dispatch({ type: REG_USER, payload: res.data });
};
//Send the login attempt to the back-end, if the login is successful, set the user to logged in
export const loginUser = (values, history) => async dispatch => {
  console.log("values");
  //post users login details to the back-end
  await axios.post("/users/login", values).then(res => {
    localStorage.setItem("token", res.headers.xauth);
    dispatch(setUser(res.data));

    setAuth(res.headers.xauth);
    console.log(res.headers.xauth);
  });
};
//Add a photo to the photobucket and return the result
export const bucketPhoto = values => async dispatch => {
  console.log("bucket");
  var form = new FormData();
  var file = values.file;
  form.append(file.name, file);
  form.append("name", file.name);
  const res = await axios.post("/bucket/add", form);
  console.log("bucketPhoto");
  //send the result back
  dispatch({ type: BUCKET_PHOTO, payload: res.data });
};
//Sends the search parameters and return the results
export const searchImage = values => async dispatch => {
  //console.log(values.tags);
  const res = await axios.post("/image/search", values);
  console.log("We're in the good zone");
  //console.log(res1.data);

  //const res = await axios.post("/bucket/get", res1.data);
  //  console.log(res);
  //send the result back
  dispatch({ type: IMG_SEARCH, payload: res.data });
};
//Upload an image, its information, and tags to the database.
export const updateTag = values => async dispatch => {
  const res = await axios.post("/tag/update", values);
  console.log("updateTag");
  dispatch({ type: UPDATE_TAG, payload: res.data });
};
