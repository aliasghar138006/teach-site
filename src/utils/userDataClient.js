"use client";

async function userDataClient(props) {
  const res = await fetch("http://127.0.0.1:8000/account/users/");
  const data = await res.json();
  if (document.cookie) {
    const cookie = JSON.parse(document.cookie);
    const result = data.filter((item) => item.userName === cookie.userName)[0];
    return result;
  }
}

export default userDataClient;
