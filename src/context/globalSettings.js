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
  ApiUrl: "https://serotonin-rush.herokuapp.com",
});
