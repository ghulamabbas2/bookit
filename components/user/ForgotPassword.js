import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'

import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../redux/actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (message) {
            toast.success(message)
        }

    }, [dispatch, message, error])


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            email
        }

        dispatch(forgotPassword(userData))

    }


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : 'Send Email'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
