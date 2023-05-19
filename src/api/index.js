import request from "@/utils/request";
export const login = (data) =>
  request({
    method: "post",
    url: "/login",
    data
  });
export const getNavList = (role) =>
  request({
    method: "get",
    url: "/getNavList?role=" + role
  });
