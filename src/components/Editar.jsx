import React from "react";
import {Apiurl} from "../services/apirest";
//librerias
import axios from "axios";
import '../assets/css/Editar.css';
import Header from '../template/Header';

class Editar extends React.Component{

    state = {
        form:{
            "first_name": "",
            "last_name": "",
            "email": "",
            "token": "",
            "usuarioId": "",
        },
        error: false,
        errorMsg: ""
    }

    manejadorSubmit = e=>{
        e.preventDefault();
    }
    componentDidMount(){
        let usuarioId = this.props.match.params.id;
        //console.log(usuarioId);
        let url = Apiurl + "users/" + usuarioId;
        axios.get(url)
        .then(response=>{
            console.log(response.data.data.first_name);
            this.setState({
                form:{
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    token: localStorage.getItem("token"),
                    usuarioId: usuarioId,
                }
            });
            //console.log(response.data.data);
        })
    }
    manejadorChance = async e =>{
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
        //console.log(this.state.form);
    }

    put =()=>{
        console.log(this.state.form)
        let url = Apiurl + "users/"+this.state.form.usuarioId;
        axios.put(url,this.state.form)
        .then( response => {
            console.log(response)
        })
    }

    /*delete =()=>{
        let usuarioId = this.props.match.params.id;
        let url = Apiurl + "users/"+usuarioId;
        let datos = {
            "token": 
        }
        axios.delete(url,this.state.form)
        .then( response => {
            console.log(response)
        })
    }*/

    render(){
        const form = this.state.form;
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <h1 id="titulo">Editar Usuario</h1>
                </div>
                <div className="container">
                    <form className="form-horizontal" onSubmit = {this.manejadorSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-dm-2 control-label" >Nombre: </label>
                                <div className="col-md-10">
                                    <input type="text" name="first_name"  className="form-control" value={form.first_name} onChange={this.manejadorChance} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-dm-2 control-label">Apellido: </label>
                                <div className="col-md-10">
                                    <input type="text" name="last_name" className="form-control" value={form.last_name} onChange={this.manejadorChance}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label className="col-dm-2 control-label">Email: </label>
                                <div className="col-md-10">
                                    <input type="email" name="email" className="form-control"   style= {{ width: "85%" }}  value={form.email} onChange={this.manejadorChance}/>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="btn btn-primary" onClick= {()=>this.put()} >Editar</button>
                        <button type="submit" className="btn btn-danger">Eliminar</button> 
                        <a href="/dashboard" className="btn btn-success">Regresar</a>                        
                    </form>
                </div>
            </React.Fragment>
        );

    }
}


export default Editar