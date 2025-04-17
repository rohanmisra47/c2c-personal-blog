# Clinician to Creator Blog

A simple personal blog and website that uses HTML, CSS, Javascript and Node.js. The blog posts are rendered using markdown files.

## Features
- Navigation bar at the top
- A home page with featured posts
- A blog page listing all blog posts
- Individual post pages with markdown support
- Responsive design
- Clean and modern UI

## Installation

1. Make sure you have Node.js installed on your system
2. Clone this repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Visit http://localhost:3000 in your browser

## Project Structure
- `/posts` - Contains markdown files for blog posts
- `/public` - Static files (CSS, images)
- `/views` - EJS templates
- `server.js` - Main application file

## Adding New Posts
To add a new blog post:
1. Create a new markdown file in the `/posts` directory
2. Name format: `YYYY-MM-DD-title.md`
3. Start the file with a title using markdown heading: `# Your Title`
4. Write your content in markdown format 