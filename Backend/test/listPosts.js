const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const listPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log('All Posts:');
        response.data.forEach((post, index) => {
            console.log(`\n${index + 1}. ${post.title}`);
            console.log(`   Categories: ${post.categories.join(', ')}`);
            console.log(`   Created: ${new Date(post.createdAt).toLocaleString()}`);
        });
        console.log(`\nTotal posts: ${response.data.length}`);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

listPosts(); 