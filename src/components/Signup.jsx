import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        setError('');
        setSuccessMessage('');

        if (!username || !name || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(
              "https://train-tkt-backend.onrender.com/signup",
              {
                username: username,
                name: name,
                password: password,
                email: email,
              }
            );

            if (!response) {
                console.error("h")
            }
            
            setSuccessMessage('Signup successful! You can now log in.');
            setTimeout(()=>{
                setError()
                setPassword()
                setUsername()
                setSuccessMessage()
                setName()
                
            },1000)
            setTimeout(()=>{
                navigate('/login')
            },1500)
        } catch (error) {
           
            console.error(error);
            if (error.response) {
                
                setError(error.response.data.message);
            } else {
                
                setError('Signup failed. Please try again later.');
            }
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='email'
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="username"
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>.
                    </div>
                </div>
                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
};

export default Signup;
