import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";
import { REGISTER_URL } from '../../constants/apiUrl';
import useAxios from '../../hooks/useAxios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();
    const axios = useAxios();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!/^[A-Za-z0-9_]+$/.test(name)) {
            newErrors.name = 'Name must only contain letters, numbers, and underscores.';
            isValid = false;
        }

        if (!email.endsWith('@stud.noroff.no') && !email.endsWith('@noroff.no')) {
            newErrors.email = 'Only email addresses with @stud.noroff.no or @noroff.no may register.';
            isValid = false;
        }

        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const payload = {
            name,
            email,
            password,
            avatar: avatarUrl || '/assets/default-avatar.png', // Provide default image if avatarUrl is empty
            banner: bannerUrl || '/assets/default-banner.jpg'  // Provide default image if bannerUrl is empty
        };

        try {
            const response = await axios.post(REGISTER_URL, payload);
            login(response.data.token);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
        }
    };
  
    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="avatarUrl" className="form-label">Avatar URL (optional)</label>
                    <input type="text" className="form-control" id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Enter Avatar URL" />
                </div>
                <div className="mb-3">
                    <label htmlFor="bannerUrl" className="form-label">Banner URL (optional)</label>
                    <input type="text" className="form-control" id="bannerUrl" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="Enter Banner URL" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;
