import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import PermissionDataService from "../../services/PermissionService";

import PermissionTypeDataService from "../../services/PermissionTypeService";
import { faUserShield, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Edit = props => {
//listar tipo de permisos
  const [option, setOption] = useState();
  const [permissionsType, setPermissionsType] = useState([]);
  
  const {id} = useParams();
  useEffect(() => {
    retrievePermissions();
    if (id)
    getPermissions(id);
    
    }, [id]);
    const retrievePermissions = () => {
      PermissionTypeDataService.getAll()
        .then(response => {
          setPermissionsType(response.data.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

  //editar permisos

  const initialPermissionsState = {
    id: null,
    employeeName: "",
    employeeLastname: "",
    permissionTypeId: 0
  };
    const [permissions, setPermissions] = useState(initialPermissionsState);
    const [message, setMessage] = useState("");

    // function (){

    // }
    const getPermissions = id => {
        PermissionDataService.get(id)
          .then(response => {
            setPermissions(response.data.data);
            setOption(response.data.data.permissionTypeId);
          })
          .catch(e => {
            console.log(e);
          });
      };
      const handleInputChange = event => {
        const { name, value } = event.target;
        setPermissions({ ...permissions, [name]: value });
      };
      const updatePermissions = () => {
        var data = {
          id: permissions.id,
          employeeName: permissions.employeeName,
          employeeLastname: permissions.employeeLastname,
          permissionTypeId: option
        };
        console.log(data);
        PermissionDataService.update(data)
          .then(response => {
            console.log(response.data);
            setMessage("Actualizado correctamente!");
          })
          .catch(e => {
            console.log(e);
          });
      };

    
      return (
      
         <div className="list row">
          <div className="col-md-8">
            
          </div>
          <div className="col-md-6">
            <h4 className="text-center mb-4 pb-2 border-b"><FontAwesomeIcon icon={faUserShield} /> Editar Permiso</h4>

            <div className="submit-form">
              {permissions ? (
                 <div>
                 <div className="mb-3">
                   <label htmlFor="employeeName">Nombre</label>
                   <input
                     type="text"
                     className="form-control"
                     id="employeeName"
                     required
                     value={permissions.employeeName}
                     onChange={handleInputChange}
                     name="employeeName"
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="employeeLastname">Apellidos</label>
                   <input
                     type="text"
                     className="form-control"
                     id="employeeLastname"
                     required
                     value={permissions.employeeLastname}
                     onChange={handleInputChange}
                     name="employeeLastname"
                   />
                 </div>
                 <div className="mb-3">
                   <select className="form-select select-permission" 
                           aria-label="permissionTypeId" id="permissionTypeId"
                           namwe="permissionTypeId" onChange={(e) => setOption(e.target.value)}
                           >
                   <option value="0">Seleccionar</option>
                   {permissionsType &&
                     permissionsType.map((permissionType, index) => permissionType.id == permissions.permissionTypeId ? (
                      
                       <option selected key={index} value={permissionType.id}>{permissionType.description} </option>
                     ):(
                       <option key={index} value={permissionType.id}>{permissionType.description} </option>
                     ))}
                   </select>
                 </div>
                 <button type="submit" onClick={updatePermissions} className="btn btn-outline-primary">
                 <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                 </button>
                 {message ? <p className="bg-success mt-3 p-2 text-white text-center">{message}</p> : <p></p>}
               </div>
              ) : (
                <div>
                  <br />
                  <p>...</p>
                </div>
              )}
            </div>
          </div>
        </div>
       
      );
};

export default Edit;