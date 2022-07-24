import http from "../http-common";

const getAll = () => {
    return http.get("Permission");
  };
  
  const get = id => {
    return http.get(`Permission/${id}`);
  };
  
  const create = data => {
    return http.post("Permission", data);
  };
  
  const update = (data) => {
    return http.put(`Permission`, data);
  };
  
  const PermissionService = {
    getAll,
    get,
    create,
    update

  };
  
  export default PermissionService;