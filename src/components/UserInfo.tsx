import React from 'react';

import config from '../website-config'

export function UserInfo() {
  let userInfo: {
    username: string,
    email: string
  } = {
    username: "",
    email: ""
  }

  if(config.bearerToken != '') {
    fetch(
        config.backendUrl + "/auth/get", 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.bearerToken}`
          }
        }
      ).then((res) => {
        if(res.status == 200) {
            return res.json()
        }

        config.bearerToken = ''
      }).then((body) => {
        console.log(body);
        userInfo.username = body.username;
        userInfo.email = body.email;
      }).catch(console.error)
  }

  return(
    <h5>{userInfo.username}</h5>
  );
}

