# Aaryan Patel - Portfolio Website

A modern, responsive portfolio website showcasing my education, work experience, and projects. Built with Next.js, TypeScript, and Tailwind CSS, featuring a clean design with smooth animations and dark mode.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Live Demo

Visit the live website: [https://www.aaryan-patel.com/](https://www.aaryan-patel.com/)

## ✨ Features

- **📱 Responsive Design** - Optimized for all device sizes
- **🌙 Dark Mode** - Clean, professional dark theme
- **⚡ Performance Optimized** - Built with Next.js 15 and React 19
- **🎨 Modern UI** - shadcn/ui components with smooth Framer Motion animations
- **📧 Contact Form** - Functional contact form with Mailgun integration
- **📊 Interactive Sections** - Education timeline, experience cards, project showcases
- **🎯 SEO Optimized** - Proper meta tags and structured data

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Material UI Icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

### Backend & APIs

- **Email Service**: Mailgun.js
- **Contact API**: Next.js API routes

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Build Tool**: Next.js with Turbopack

## 📁 Project Structure

```
website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── education/         # Education page
│   ├── experience/        # Experience page
│   ├── projects/          # Projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── home/             # Homepage sections
│   ├── education/        # Education page components
│   ├── experience/       # Experience page components
│   ├── projects/         # Projects page components
│   ├── footer/           # Footer components
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Footer
├── data/                 # Data layer
│   ├── portfolio.json    # Portfolio content data
│   └── types.ts         # TypeScript type definitions
├── lib/                  # Utilities
│   └── utils.ts         # Helper functions
├── public/              # Static assets
│   ├── icons/          # Tech stack icons (SVGs)
│   ├── profile.png     # Profile image
│   └── resume.pdf      # Resume file
└── components.json      # shadcn/ui configuration
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/patel-aaryan/website.git
   cd website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Content Management

The portfolio content is managed through the `data/portfolio.json` file, which includes:

- **Personal Information** - Name, email, taglines, social links
- **About Me** - Professional summary
- **Skills** - Categorized by Languages, Frontend, Backend, DevOps
- **Education** - University details, courses, clubs, milestones
- **Experience** - Work history with descriptions and tech stacks
- **Projects** - Featured and complete project listings

To update content, simply modify the JSON file and redeploy.

## 🎨 Customization

### Styling

- Tailwind CSS configuration in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind classes

### Components

- shadcn/ui components in `components/ui/`
- Custom components organized by page/section
- Consistent design system with CSS variables

### Animations

- Framer Motion animations in component files
- Smooth page transitions and hover effects
- Performance-optimized animations

## 📧 Contact Form

The contact form uses:

- React Hook Form for form handling
- Zod for validation
- Mailgun for email delivery
- Next.js API routes for backend processing

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms

The project can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
