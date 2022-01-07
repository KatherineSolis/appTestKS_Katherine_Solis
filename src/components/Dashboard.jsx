import React from "react";
import Header from '../template/Header';
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
            console.log(response.data.data);
        })
       }

    render(){
        return(
            <React.Fragment>
                <header></header>
                <div className= "container">
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
                                    <tr key = {index}>
                                    <td> {value.id} </td>
                                    <td> {value.email} </td>
                                    <td> {value.first_name} </td>
                                    <td> {value.last_name} </td>
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