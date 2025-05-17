const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const createPost = async () => {
    try {
        // Step 1: Login
        console.log('Logging in...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: 'testuser2@example.com',
            password: 'testpassword123'
        });
        
        const token = loginResponse.data.token;
        console.log('Login successful, got token');

        // Step 2: Create post
        console.log('Creating post...');
        const postResponse = await axios.post(
            `${API_URL}/posts/create`,
            {
                title: 'My First Blog Post',
                desc: 'This is a test post created using our API.',
                photo: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
                categories: ['Test', 'First Post']
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Post created successfully:', postResponse.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        console.error('Full error:', error);
    }
};

createPost(); 