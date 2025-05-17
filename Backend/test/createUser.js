const axios = require('axios');

const createUser = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            username: "testuser",
            email: "test@example.com",
            password: "123456"
        });
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Failed to create user:', error.response?.data || error.message);
    }
};

createUser(); 