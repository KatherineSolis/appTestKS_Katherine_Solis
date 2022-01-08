import React from "react";
import Header from '../template/Header';
import '../assets/css/Dashboard.css';
import {Apiurl} from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component{

    state = {
        usuarios: []
       }

       componentDidMount(){
        let url = Apiurl + "users?page=1"; 
        
        axios.get(url)
        .then(response=>{
            this.setState({
                usuarios: response.data.data
            });
            //console.log(response.data.data);
        })
       }

       editarUsuario(id){
           this.props.history.push("/editar/"+id);
        //console.log("editar: " +id);
       }

       eliminarUsuario(id){
        console.log("eliminar: " +id);
       }

    render(){
        return(
            <React.Fragment>
                <Header></Header>
                <div className= "container">
                    <br />
                    <br />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">APELLIDO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuarios.map((value, index) =>{
                                return (
                                    <tr key = {index} >
                                    <td> {value.id} </td>
                                    <td> {value.email} </td>
                                    <td> {value.first_name} </td>
                                    <td> {value.last_name} </td>
                                    <td> <button type="button" className="btn btn-success"  onClick={() => this.editarUsuario(value.id)}>Editar</button> 
                                         <button type="button" className="btn btn-danger" onClick={() => this.eliminarUsuario(value.id)}>Eliminar</button></td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div>   
            </React.Fragment>
        );

    }
}


export default Dashboard