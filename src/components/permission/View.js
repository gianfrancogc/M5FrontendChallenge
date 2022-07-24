import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import PermissionDataService from "../../services/PermissionService";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const View=()=>{
    const {id} = useParams();
    const initialPermissionsState = {
        employeeName: "",
        employeeLastname: "",
        permissionTypeId: 0
      };
    const [permissions, setPermissions] = useState([initialPermissionsState]);

    useEffect(() => {
        if (id)
        ViewPermissions(id);
      }, [id]);
    
      const ViewPermissions = () => {
        PermissionDataService.get(id)
          .then(response => {
            setPermissions(response.data.data);
            console.log(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      return (
        <div className="list row">
          <div className="col-md-12">
            <h4><FontAwesomeIcon icon={faMagnifyingGlass} />Vista previa</h4>

            <div className="p-2 content-view-data">
                <div className="type-permission-view">
                    {permissions.permissionType}
                </div>
                <h2 className="pt-4 pl-2">{permissions.employeeLastname}</h2>
                <h5 className="name-permission-view">{permissions.employeeName} </h5>
                
            </div>
          </div>
        </div>
      );
};

export default View;