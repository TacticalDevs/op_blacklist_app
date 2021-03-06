import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords dont match');
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);

        const res = await axios.post(
          'http://localhost:4000/api/users',
          body,
          config
        );
        // Token coming back
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  const { name, email, password, confirmPassword } = formData;
  return (
    <>
      <h1>Register</h1>
      <p>Create a new account</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={6}
          value={password}
          onChange={handleChange}
          required
        />
        <small>Please use a strong password, minimum 6 characters.</small>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          minLength={6}
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/register">Login</Link>
      </p>
    </>
  );
};

export default Register;
