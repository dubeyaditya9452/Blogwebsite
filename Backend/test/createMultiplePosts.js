const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const posts = [
    {
        title: "Getting Started with React",
        desc: "A comprehensive guide for beginners looking to start their journey with React.js. Learn about components, state, props, and more.",
        photo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        categories: ["Programming", "React", "Web Development"]
    },
    {
        title: "10 Essential JavaScript Array Methods",
        desc: "Master the most important array methods in JavaScript: map, filter, reduce, and more. Includes practical examples and use cases.",
        photo: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
        categories: ["JavaScript", "Programming", "Coding Tips"]
    },
    {
        title: "The Art of Mindful Living",
        desc: "Discover how mindfulness can transform your daily life. Learn practical meditation techniques and mindful habits for better well-being.",
        photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        categories: ["Lifestyle", "Mindfulness", "Health"]
    },
    {
        title: "Modern Web Design Trends 2025",
        desc: "Explore the latest trends in web design, from glassmorphism to dark mode interfaces. Stay ahead of the curve in web development.",
        photo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
        categories: ["Design", "Web Development", "Trends"]
    },
    {
        title: "Mastering Node.js Backend Development",
        desc: "Deep dive into building scalable backend applications with Node.js. Covers Express, MongoDB, authentication, and best practices.",
        photo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        categories: ["Node.js", "Backend", "Programming"]
    },
    {
        title: "Healthy Recipes for Busy Developers",
        desc: "Quick and nutritious recipes perfect for developers and tech professionals who want to maintain a healthy lifestyle while coding.",
        photo: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        categories: ["Health", "Food", "Lifestyle"]
    },
    {
        title: "Understanding REST API Design",
        desc: "Learn the principles of designing clean and efficient REST APIs. Includes best practices, authentication strategies, and common pitfalls.",
        photo: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2",
        categories: ["API", "Web Development", "Backend"]
    },
    {
        title: "Productivity Tools for Developers",
        desc: "A curated list of the best tools and applications to boost your productivity as a developer. From code editors to time management apps.",
        photo: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
        categories: ["Productivity", "Tools", "Development"]
    },
    {
        title: "Introduction to Machine Learning",
        desc: "Begin your journey into machine learning. Understand basic concepts, algorithms, and practical applications in modern technology.",
        photo: "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
        categories: ["Machine Learning", "AI", "Technology"]
    },
    {
        title: "Building a Personal Brand as a Developer",
        desc: "Tips and strategies for building your personal brand in the tech industry. Learn to showcase your skills and stand out in the job market.",
        photo: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55",
        categories: ["Career", "Personal Development", "Technology"]
    }
];

const createPosts = async () => {
    try {
        // Step 1: Login
        console.log('Logging in...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: 'testuser2@example.com',
            password: 'testpassword123'
        });
        
        const token = loginResponse.data.token;
        console.log('Login successful, got token');

        // Step 2: Create posts
        console.log('Creating posts...');
        for (const post of posts) {
            try {
                const postResponse = await axios.post(
                    `${API_URL}/posts/create`,
                    post,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(`Created post: ${post.title}`);
            } catch (error) {
                console.error(`Failed to create post "${post.title}":`, error.response?.data || error.message);
            }
            // Add a small delay between posts to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('All posts created successfully!');
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

createPosts(); 