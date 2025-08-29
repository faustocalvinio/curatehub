
# 🎯 CurateHub

> A curated collection of valuable web development resources

CurateHub is a personal webpage where I've carefully collected and organized valuable resources related to web development. This collection has been built over time, featuring tools, libraries, APIs, learning materials, and inspiration sources that have proven to be informative and useful in my development journey.

## ✨ Features

- **🎨 Modern UI**: Clean and responsive design with dark/light mode support
- **🚀 Fast Performance**: Built with Astro for optimal loading speeds
- **📱 Mobile Responsive**: Fully optimized for all device sizes
- **🎭 Smooth Transitions**: Enhanced user experience with view transitions
- **🔍 Easy Navigation**: Intuitive category-based organization
- **🌓 Theme Support**: Dark and light mode toggle

## 📸 Screenshots

![CurateHub Interface](/public/screenshots/ss-curate.webp)

*Modern interface showing the resource categories with smooth navigation*

## 🗂️ Categories

The resources are organized into the following categories:

| Category | Description | Icon |
|----------|-------------|------|
| **AI** | AI tools and resources for developers | 🤖 |
| **APIs** | Public APIs for testing and development | 📡 |
| **HTML** | HTML tools, references, and utilities | 🌐 |
| **CSS** | CSS frameworks, generators, and animations | 🎨 |
| **UI** | User interface design tools and inspiration | 💫 |
| **React** | React libraries, tools, and resources | ⚛️ |
| **Ideas** | Design inspiration and creative showcases | 💡 |
| **Tools** | Development tools and utilities | 🛠️ |
| **JavaScript** | JavaScript libraries and frameworks | 📜 |
| **Images** | Image processing and optimization tools | 🖼️ |
| **Interviews** | Technical interview preparation resources | 🎤 |
| **Challenges** | Coding challenges and practice platforms | 🏆 |
| **Learning** | Educational resources and tutorials | 📚 |
| **CheatSheets** | Quick reference guides and cheatsheets | 📋 |
| **Jobs** | Job boards and career resources | 💼 |
| **Icons** | Icon libraries and generators | 🎯 |
| **Next.js** | Next.js specific tools and resources | ▲ |

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** - Static Site Generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[View Transitions API](https://docs.astro.build/en/guides/view-transitions/)** - Smooth Page Transitions
- **Markdown** - Content Management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/faustocalvinio/personal-resources.git
   cd personal-resources
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:4321
   ```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
curatehub/
├── public/
│   ├── favicon.svg
│   ├── pencil.png
│   └── screenshots/
├── src/
│   ├── assets/
│   │   └── svg/          # Category icons
│   ├── components/
│   │   ├── Card.astro           # Resource card component
│   │   ├── CategoryCard.astro   # Category navigation card
│   │   ├── CategoryNav.astro    # Category navigation bar
│   │   ├── Footer.astro         # Site footer
│   │   └── Navbar.astro         # Site navigation
│   ├── layouts/
│   │   └── Layout.astro         # Base layout
│   ├── pages/
│   │   ├── index.astro          # Home page
│   │   ├── resources/
│   │   │   └── [category].astro # Dynamic category pages
│   │   └── prueba/              # Test/experimental pages
│   └── styles/
│       └── global.css           # Global styles
├── content/                     # Markdown content files
│   ├── ai/
│   ├── apis/
│   ├── css/
│   ├── html/
│   ├── javascript/
│   ├── react/
│   └── ... (other categories)
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 📝 Adding New Resources

To add a new resource to any category:

1. Navigate to the appropriate folder in `content/`
2. Create a new `.md` file with the following frontmatter:

```markdown
---
title: "Resource Name"
description: "Brief description of the resource"
link: "https://example.com"
imageURL: "https://example.com/image.jpg" # Optional
---

Optional content body here.
```

## 🎨 Customization

### Adding New Categories

1. Add the category folder in `content/`
2. Update the category arrays in:
   - `src/pages/resources/[category].astro`
   - `src/components/CategoryNav.astro`
   - `src/pages/index.astro`
3. Add the corresponding SVG icon in `src/assets/svg/`

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.mjs`
- Global styles in `src/styles/global.css`
- Component-specific styles in individual `.astro` files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Fausto Calvinio**
- GitHub: [@faustocalvinio](https://github.com/faustocalvinio)
- LinkedIn: [Fausto Calvinio](https://www.linkedin.com/in/faustocalvinio/)

## 🙏 Acknowledgments

- All the amazing developers who created the resources featured in this collection
- The Astro team for the excellent static site generator
- The open-source community for continuous inspiration

---

⭐ If you find this project useful, please give it a star on GitHub!