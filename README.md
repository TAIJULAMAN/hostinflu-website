<div align="center">

# 🏠✨ HostInflu

### *Where Hospitality Meets Influence*

**Connect property hosts with social media influencers for authentic collaborations**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

---

</div>

## 🌟 Overview

**HostInflu** is a cutting-edge platform that bridges the gap between property hosts and social media influencers. We facilitate meaningful collaborations where hosts offer unique stays in exchange for authentic social media exposure, creating win-win partnerships that benefit both parties.

### 🎯 Mission

Revolutionize the hospitality and influencer marketing industries by creating a seamless ecosystem where property owners gain exposure and influencers discover unique experiences.

---

## ✨ Features

### 🏡 For Hosts
- **Property Management** - List and manage multiple properties with detailed information
- **Influencer Discovery** - Browse and connect with verified influencers
- **Deal Tracking** - Monitor collaboration proposals and agreements
- **Analytics Dashboard** - Track engagement, reach, and ROI from collaborations
- **Transaction Management** - Secure payment and star-based reward system

### 📱 For Influencers
- **Property Discovery** - Explore unique properties and collaboration opportunities
- **Collaboration Hub** - Manage active and past collaborations
- **Earnings Tracker** - Monitor stars earned and redeem rewards
- **Portfolio Showcase** - Display your social media metrics and past work
- **Transaction History** - View detailed earning and redemption records

### 🎨 Platform Features
- **Modern UI/UX** - Beautiful, responsive design with dark mode support
- **Real-time Updates** - Live notifications and status updates
- **Secure Authentication** - Protected user accounts and data
- **Advanced Filtering** - Smart search and filtering for properties and influencers
- **Interactive Charts** - Visual analytics powered by Chart.js and Recharts
- **Mobile Responsive** - Seamless experience across all devices

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hostinflu.git
   cd hostinflu
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file with necessary credentials.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Data Visualization
- **[Chart.js](https://www.chartjs.org/)** - Interactive charts
- **[Recharts](https://recharts.org/)** - Composable chart library
- **[react-chartjs-2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

---

## 📁 Project Structure

```
hostinflu/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard pages
│   │   ├── admin/              # Admin-specific pages
│   │   ├── influencer/         # Influencer-specific pages
│   │   ├── influencer-collaborations/
│   │   ├── influencer-transactions/
│   │   ├── influencer-redeem-requests/
│   │   └── ...
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── commom/                 # Shared components (Navbar, Footer)
│   ├── dashboard/              # Dashboard components
│   ├── landing/                # Landing page sections
│   └── ui/                     # Reusable UI components
├── contexts/                    # React contexts
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
├── styles/                      # Additional styles
└── ...config files
```

---

## 🎨 Design Philosophy

HostInflu follows modern web design principles:

- **🎯 User-Centric** - Intuitive navigation and clear user flows
- **🌈 Visual Excellence** - Vibrant colors, smooth gradients, and micro-animations
- **📱 Mobile-First** - Responsive design that works beautifully on all devices
- **♿ Accessible** - WCAG compliant with semantic HTML and ARIA labels
- **⚡ Performance** - Optimized for speed with Next.js best practices
- **🌙 Dark Mode** - Seamless theme switching for user preference

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

---

## 📊 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Marketing homepage with features and pricing |
| **Host Dashboard** | `/dashboard` | Property management and analytics |
| **Influencer Dashboard** | `/dashboard/influencer` | Collaboration and earnings overview |
| **Admin Panel** | `/dashboard/admin` | Platform administration |
| **Collaborations** | `/dashboard/influencer-collaborations` | Active and past collaborations |
| **Transactions** | `/dashboard/influencer-transactions` | Payment and reward history |
| **Redeem Requests** | `/dashboard/influencer-redeem-requests` | Star withdrawal management |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

### 🌟 Star us on GitHub if you find this project useful!

**Made with 💜 by the HostInflu Team**

[Website](https://hostinflu.com) • [Documentation](https://docs.hostinflu.com) • [Support](mailto:support@hostinflu.com)

</div>
