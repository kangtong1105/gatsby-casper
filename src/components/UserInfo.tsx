import React, { useState } from 'react';

import config from '../website-config'

export function UserInfo() {

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: ""
  })

  const loginToken = localStorage.getItem('loginToken')
  console.log("token:" + loginToken)

  if(loginToken != null && userInfo.email == "") {
    fetch(
        config.backendUrl + "/auth/get", 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`
          }
        }
      ).then((res) => {
        if(res.status == 200) {
          res.json().then((body) => {
            console.log(body);
            if(userInfo.email != body.email) {
              userInfo.username = body.username;
              userInfo.email = body.email;
              setUserInfo({...userInfo})
            }
          })
        }
      }).catch(console.error)
  }

  return(
    <>{userInfo.username}</>
  );
}


