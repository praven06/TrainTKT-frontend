import { Link } from 'react-router-dom';
import bgImage from '../assets/bg2.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLoginStatus } from '../redux/features/login/IsLoged'
import { updateId, updateEmail, updateName, updateUserName } from '../redux/features/user/user'
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(
              "https://train-tkt-backend.onrender.com/login",
              {
                username,
                password,
              }
            );
            
            
            setSuccessMessage('Login successful! Redirecting...');

            setUsername('');
            setPassword('');

            dispatch(updateId(response.data._id))
            dispatch(updateName(response.data.name))
            dispatch(updateUserName(response.data.username))
            dispatch(updateEmail(response.data.email))
            dispatch(changeLoginStatus(true));

            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            console.error(error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={bgImage} alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
                            autoComplete='username'
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete='current-password'
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
                        Login
                    </button>
                </form>
                <div className="mt-6 text-blue-500 text-center">
                    <Link to="/signup" className="hover:underline">Sign up Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
