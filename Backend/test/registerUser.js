const axios = require('axios');

const registerUser = async () => {
    try {
        const userData = {
            username: "testuser2",
            email: "testuser2@example.com",
            password: "testpassword123"
        };

        const response = await axios.post('http://localhost:5000/api/auth/register', userData);
        console.log('User registered successfully:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

registerUser(); 