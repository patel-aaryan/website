# Aaryan Patel - Portfolio Website

A modern, responsive portfolio website showcasing my education, work experience, and projects. Built with Next.js, TypeScript, and Tailwind CSS, featuring a clean design with smooth animations and dark mode.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Live Demo

Visit the live website: [https://www.aaryan-patel.com](https://www.aaryan-patel.com/)

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

## 📝 Content Management

The portfolio content is managed through the `data/portfolio.json` file, which includes:

- **Personal Information** - Name, email, taglines, social links
- **About Me** - Professional summary
- **Skills** - Categorized by Languages, Frontend, Backend, DevOps
- **Education** - University details, courses, clubs, milestones
- **Experience** - Work history with descriptions and tech stacks
- **Projects** - Featured and complete project listings

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
