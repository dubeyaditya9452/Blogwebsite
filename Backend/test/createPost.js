const axios = require('axios');

const createPost = async () => {
    try {
        // First, login to get the token
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'testuser@example.com',    // Test user email
            password: 'testpassword123'       // Test user password
        });

        const token = loginResponse.data.token;

        // Create a new post
        const postData = {
            title: "Test Post Title", 
            desc: "This is a test post description to verify the post creation endpoint.",
            categories: ["test", "programming"],
            photo: "https://example.com/test-image.jpg"  // Optional
        };

        const response = await axios.post('http://localhost:5000/api/posts/create', 
            postData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('Post created successfully:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

createPost(); 