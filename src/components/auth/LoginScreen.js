import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [loginValues, loginHandleInputChange] = useForm({
        lEmail: '',
        lPassword: '',
    });

    const {lEmail, lPassword} = loginValues;

    const [registerValues, registerHandleInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword:'',
        rPassword2: ''
    })

    const {rName, rEmail, rPassword, rPassword2} = registerValues;

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (rPassword !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas tienen que coincidir', 'error');
        }

        dispatch( startRegister( rName, rEmail, rPassword ) );

    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name= 'lEmail'
                                onChange={loginHandleInputChange}
                                value = {lEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= 'lPassword'
                                onChange={loginHandleInputChange}
                                value = {lPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                onChange={registerHandleInputChange}
                                value={rName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                onChange={registerHandleInputChange}
                                value={rEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='rPassword'
                                onChange={registerHandleInputChange}
                                value={rPassword} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='rPassword2'
                                onChange={registerHandleInputChange}
                                value={rPassword2} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
