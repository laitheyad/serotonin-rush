import React from "react";

export default React.createContext({
  user_info: {
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    phone: "",
    avatar: "",
  },
  username: "",
  token: "",
  ApiUrl: "http://192.168.1.80:8000",
});
