import {toast} from "react-toastify";

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const notify = (msg, status) => {
  if(status == 'error') {
    toast.error(msg);
  } else {
    toast.success(msg);
  }
}

export const setLocalStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) ?? null;
}

export const ucFirst = (str) => {
    //let first = str.splice(0,1);
    return str.charAt(0).toUpperCase() + str.slice(1);
}