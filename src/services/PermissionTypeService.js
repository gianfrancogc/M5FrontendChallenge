import http from "../http-common";

const getAll = () => {
    return http.get("PermissionType");
  };
  

const PermissionTypeService = {
    getAll
  };
  
  export default PermissionTypeService;