import React from "react";
import '../assets/css/Login.css';
import logo from '../assets/img/logo.png';
import {Apiurl} from "../services/apirest";
//librerias
import axios from "axios";

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        form: {
            "email": "",
            "password": "",
        },
        error: false,
        errorMsg: ""
    }

    manejadorSubmit(e){
        e.preventDefault();
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

    manejadorIngresar = () =>{
        let url = Apiurl + "login";
        console.log(this.state.form);
        axios.post(url, this.state.form)
        .then(response =>{
            if(response.status === 200){
                //if (this.state.form.email == "eve.holt@reqres.in" && this.state.form.passwoard == "cityslicka"){
                    localStorage.setItem("token", response.data.token);
                    this.props.history.push("/dashboard");
                //}else{
                   /* this.setState({
                        error : true,
                        errorMsg : "Usuario/Contraseña incorrectos"
                    });*/
                //}
                
            }else {
                this.setState({
                    error : true,
                    errorMsg : "Usuario no encontradom"
                });
            }
            //console.log(response);
        }).catch(error =>{
            console.log(error);
            this.setState({
                error : true,
                errorMsg : "Error al conectar la api"
            });
        });
        //console.log("click");
    }

    render(){
        return(
            <React.Fragment>
                <div className="wrapper fadeInDown">
                <div id="formContent">
                   
                    <div className="fadeIn first">
                        <br /><br />
                    <img src={logo}  width="100px" alt="User Icon" />
                    </div>

                    <form onSubmit={this.manejadorSubmit}>
                    <input type="text"  className="fadeIn second" name="email" placeholder="login" onChange={this.manejadorChance} />
                    <input type="password"  className="fadeIn third" name="password" placeholder="password" onChange={this.manejadorChance}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorIngresar} />
                    </form>

                    {this.state.error === true && 
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                    </div>}
                        
                </div>
                </div>
            </React.Fragment>
        );

    }
}


export default Login