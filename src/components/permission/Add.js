import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PermissionDataService from "../../services/PermissionService";

import PermissionTypeDataService from "../../services/PermissionTypeService";
import { faUserShield, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Add=()=>{
  
  const [option, setOption] = useState();

//listar tipo de permisos
  const [permissionsType, setPermissionsType] = useState([]);

  useEffect(() => {
      retrievePermissions();
    }, []);
  
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

  //agregar permisos
  const initialPermissionsState = {
    employeeName: "",
    employeeLastname: "",
    permissionTypeId: 0
  };
    const [permissions, setPermissions] = useState(initialPermissionsState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
      const { name, value } = event.target;
      setPermissions({ ...permissions, [name]: value });
    };

    const savePermissions = () => {
      var data = {
        employeeName: permissions.employeeName,
        employeeLastname: permissions.employeeLastname,
        permissionTypeId: option
      };
      PermissionDataService.create(data)
        .then(response => {
          setPermissions({
            employeeName: response.data.employeeName,
            employeeLastname: response.data.employeeLastname,
            permissionTypeId: response.data.permissionTypeId
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const newPermissions = () => {
      setPermissions(initialPermissionsState);
      setSubmitted(false);
    };
    
      return (
      
         <div className="list row">
          <div className="col-md-6">
            <h4 className="text-center mb-4 pb-2 border-b"><FontAwesomeIcon icon={faUserShield} /> Agregar Nuevo Permiso</h4>

            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>¡Lo enviaste con éxito!</h4>
                  <button className="btn btn-success" onClick={newPermissions}>
                    Agregar Nuevo
                  </button>
                </div>
              ) : (
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
                            namwe="permissionTypeId" 
                            onChange={(e) => setOption(e.target.value)}>
                    <option value="0">Seleccionar</option>
                    {permissionsType &&
                      permissionsType.map((permissionType, index) => (
                        <option key={index} value={permissionType.id}>{permissionType.description}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={savePermissions} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
       
      );
};

export default Add;