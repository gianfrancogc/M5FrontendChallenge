import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PermissionTypeDataService from "../../services/PermissionTypeService";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PermissionListType=()=>{
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        retrievePermissions();
      }, []);
    
      const retrievePermissions = () => {
        PermissionTypeDataService.getAll()
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
            <h4 className="mb-4 pb-2 border-b"><FontAwesomeIcon icon={faShieldHalved} /> Lista de tipos de permisos</h4>
        
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  {/* <th scope="col">Acciones</th> */}
                </tr>
              </thead>
              <tbody>
              {permissions &&
                permissions.map((permission, index) => (
                  <tr  key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{permission.description}</td>
                    {/* <td><Link  to={"/edit"}>Editar</Link> <Link  to={`/view/${permission.id}`}>Ver</Link></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};

export default PermissionListType;