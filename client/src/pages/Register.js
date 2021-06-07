import React, {  useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks'

function Register(props) {
    const [errors, setErrors] = useState({});
    
    function registerUser() {
        addUser();
    }
    
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password:'',
        confirmPassword:''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(
            _,{
            data: { 
                register: 
                userData 
            }}
        ){
            // context.login(userData); 
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });
            
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input 
                    label="Username" 
                    placeholder="Username.." 
                    name="username" 
                    values={values.username }
                    type="text"
                    error = {errors.username ? true : false}
                    onChange={onChange}>
                </Form.Input>

                <Form.Input 
                    label="Email" 
                    placeholder="Email.." 
                    name="email" 
                    values={values.email }
                    error = {errors.email ? true : false}
                    onChange={onChange}>
                </Form.Input>

                <Form.Input 
                    label="password" 
                    placeholder="password.." 
                    name="password" 
                    values={values.password }
                    type="password"
                    error = {errors.password ? true : false}
                    onChange={onChange}>
                </Form.Input>

                <Form.Input 
                    label="confirm password" 
                    placeholder="confirm password.." 
                    name="confirmPassword" 
                    value={values.confirmPassword }
                    type="password"
                    error = {errors.confirmPassword ? true : false}
                    onChange={onChange}>
                </Form.Input>  

                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword

            }
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Register 
