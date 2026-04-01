# Embedded Systems Developer Portfolio

A modern, interactive portfolio website for embedded C developers built with React and Framer Motion.

## Features

✨ **Smooth Animations** - Powered by Framer Motion for buttery-smooth transitions
🎮 **Binary Decoder Game** - Interactive game where users decode binary to decimal values
📊 **Live System Monitor** - Animated real-time CPU, memory, and temperature display
🎨 **Modern Design** - Dark terminal-inspired theme with electric blue accents
🖱️ **Custom Cursor** - Smooth custom cursor with spring physics
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
⚡ **Interactive Elements** - Circuit board background, animated microchip, skill bars
🚀 **Performance Optimized** - Lightweight and fast

## Sections

1. **Home** - Hero section with animated microchip and terminal greeting
2. **About** - Personal introduction with expertise tags and live system monitor
3. **Binary Game** - Interactive binary-to-decimal converter game with scoring
4. **Skills** - Animated progress bars showcasing technical expertise
5. **Contact** - Social links and contact information

## Game Instructions

The **Binary Decoder** is an interactive game where:
- You see 8 bits (binary digits) that you can click to flip between 0 and 1
- A target decimal number is displayed
- Click the bits to match the target value
- Score points for each correct answer
- The game automatically generates new challenges

## Technologies

- **React** - Frontend framework
- **Framer Motion** - Animation library
- **CSS-in-JS** - Styled with JSX style blocks

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Create a new React app:**
```bash
npx create-react-app embedded-portfolio
cd embedded-portfolio
```

2. **Install Framer Motion:**
```bash
npm install framer-motion
```

3. **Replace the default App.js:**
- Copy the contents of `portfolio.jsx` 
- Replace `src/App.js` with the portfolio component
- Import it as: `import Portfolio from './portfolio';`

Or simply replace `src/App.js` entirely with:
```jsx
import Portfolio from './Portfolio';

function App() {
  return <Portfolio />;
}

export default App;
```

And save the portfolio.jsx file as `src/Portfolio.jsx`

4. **Add JetBrains Mono font (optional but recommended):**

Add to `public/index.html` in the `<head>` section:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

5. **Start the development server:**
```bash
npm start
```

Visit `http://localhost:3000` to see your portfolio!

## Deployment to GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**

Add homepage field (replace YOUR_USERNAME with your GitHub username):
```json
{
  "homepage": "https://YOUR_USERNAME.github.io",
  ...
}
```

Add deployment scripts:
```json
{
  "scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Configure GitHub Pages:**
- Go to your repository settings
- Navigate to Pages section
- Select `gh-pages` branch as source
- Your site will be live at `https://YOUR_USERNAME.github.io`

## Customization

### Update Personal Information

Edit the following sections in `Portfolio.jsx`:

**About Section** (around line 200):
- Update the about text with your own story
- Modify the expertise tags with your skills

**Skills** (around line 50):
```javascript
const skills = [
  { name: 'Your Skill', level: 90 }, // level from 0-100
  // Add more skills
];
```

**Game Settings** (around line 20):
- Adjust initial target value range
- Modify scoring system
- Customize messages

**Navigation & Content:**
- Update the logo name in the nav section
- Modify hero section text
- Update contact links with your actual URLs
- Change footer text

### Color Scheme

The main accent color is electric blue (#00f2fe). To change it:
- Search for `#00f2fe` and `#4facfe` in the file
- Replace with your preferred colors
- Update gradient definitions

### Typography

The site uses JetBrains Mono font. To change:
- Update the `font-family` in the CSS
- Add your chosen font via Google Fonts in `index.html`

## File Structure

```
embedded-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── Portfolio.jsx    # Main portfolio component
│   ├── App.js           # App entry point
│   └── index.js
└── package.json
```

## Performance Tips

- Images are minimal (SVG microchip)
- Animations use CSS transforms for GPU acceleration
- Framer Motion uses lazy loading
- Responsive images for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - feel free to use and modify for your own portfolio!

## Credits

Built with ❤️ using React and Framer Motion
