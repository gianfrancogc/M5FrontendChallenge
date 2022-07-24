import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PermissionDataService from "../../services/PermissionService";
import { faPencil, faEye, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PermissionList=()=>{
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        retrievePermissions();
      }, []);
    
      const retrievePermissions = () => {
        PermissionDataService.getAll()
          .then(response => {
            setPermissions(response.data.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      return (
        <div className="list row">
         
          <div className="col-md-12">
            <h4 className="mb-4 pb-2 border-b"><FontAwesomeIcon icon={faUserShield} /> Listado de permisos</h4>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Tipo de permiso</th>
                  <th scope="col" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {permissions &&
                permissions.map((permission, index) => (
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{permission.employeeName}</td>
                    <td>{permission.employeeLastname}</td>
                    <td>{permission.permissionType}</td>
                    <td className="text-center">
                      <Link className="btn btn-success"  to={`/edit/${permission.id}`}> <FontAwesomeIcon icon={faPencil} /></Link> <Link className="btn btn-primary"  to={`/view/${permission.id}`}><FontAwesomeIcon icon={faEye} /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};



export default PermissionList;