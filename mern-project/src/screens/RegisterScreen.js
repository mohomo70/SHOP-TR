import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/usersActions'
import FormContainer from '../components/FormContainer'
const RegisterScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state =>state.userRegister)
    const {error ,loading, userInfo} = userRegister 

    useEffect(()=>{
        if(userInfo){
            Navigate('/')
        }
    },[Navigate, userInfo])

    const submitHandler = (e) =>{
        setMessage('')
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('password doesnt match')
        }else{
        dispatch(register(username,password))
        }
    }


  return (
    <FormContainer>
            <h1>Sign Up</h1>
            {message && message}
            {error && error}
            {loading && loading}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='uesrname'>
                    <Form.Label>USER NAME </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter userName'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>



                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account ? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
  )
}

export default RegisterScreen