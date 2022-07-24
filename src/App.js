import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Permissions from "./components/permission/PermissionList";
import Add from "./components/permission/Add";
import View from "./components/permission/View";
import Edit from "./components/permission/Edit";
import PermissionListType from "./components/permission/PermissionListType";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
        <a href="/" className="navbar-brand">
        <FontAwesomeIcon icon={faUserShield} /> APP Permisos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Permissions"} className="nav-link">
              Permisos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Nuevo
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/permission-list-type"} className="nav-link">
              Tipo de Permisos
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Permissions/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/permission-list-type" element={<PermissionListType/>} />
          <Route path="*" element={<Permissions />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
