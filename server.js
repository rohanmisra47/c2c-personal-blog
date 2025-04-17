const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Function to read blog posts
function getBlogPosts() {
    const postsDirectory = path.join(__dirname, 'posts');
    const files = fs.readdirSync(postsDirectory);
    
    return files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const content = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
            const title = content.split('\n')[0].replace('# ', '');
            const date = file.split('-').slice(0, 3).join('-');
            const slug = file.replace('.md', '');
            
            return {
                title,
                date,
                slug,
                content: marked.parse(content)
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Make getBlogPosts available to all templates
app.locals.getBlogPosts = getBlogPosts;

// Routes
app.get('/', (req, res) => {
    const posts = getBlogPosts();
    res.render('index', { 
        title: 'Home',
        posts: posts.slice(0, 3)
    });
});

app.get('/blog', (req, res) => {
    const posts = getBlogPosts();
    res.render('blog', { title: 'Blog', posts });
});

app.get('/post/:slug', (req, res) => {
    const posts = getBlogPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    
    if (!post) {
        return res.status(404).render('404', { title: 'Not Found' });
    }
    
    res.render('post', { title: post.title, post });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 