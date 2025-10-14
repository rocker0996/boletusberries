# Boletus Berries - Multilingual Website

A multilingual website for Boletus Berries, a company specializing in wild mushrooms and berries. The site supports Russian (default) and English languages.

## 🌐 Language Support

- **Russian** (default): `/ru/` - Original language
- **English**: `/en/` - Fully translated version

## 📁 Project Structure

```
boletus/
├── ru/                     # Russian version (default)
│   ├── index.html
│   ├── about.html
│   ├── catalog.html
│   ├── contact.html
│   ├── production.html
│   ├── retail.html
│   ├── wholesale.html
│   ├── horeca.html
│   ├── export.html
│   └── 404.html
├── en/                     # English version
│   ├── index.html
│   ├── about.html
│   ├── catalog.html
│   ├── contact.html
│   ├── production.html
│   ├── retail.html
│   ├── wholesale.html
│   ├── horeca.html
│   ├── export.html
│   └── 404.html
├── assets/                 # Shared assets
│   ├── css/
│   ├── js/
│   ├── img/
│   └── webfonts/
├── _redirects             # Netlify redirects configuration
└── README.md
```

## 🚀 Deployment

### Netlify Configuration

The `_redirects` file is configured for Netlify deployment with the following routing:

- **Default (Russian)**: `/` → `/ru/index.html`
- **English**: `/en` → `/en/index.html`
- **404 pages**: Language-specific 404 pages
- **All other routes**: Properly redirected to language-specific versions

### URL Structure

- **Russian**: `yoursite.com/` (default)
- **English**: `yoursite.com/en/`
- **Specific pages**: `yoursite.com/en/about`, `yoursite.com/en/contact`, etc.

## 🔧 Features

### Language Switcher
- Interactive dropdown with flag icons
- Automatic language detection
- Smooth transitions between languages
- Mobile-responsive design

### Pages
- **Home**: Company overview and featured products
- **About**: Company information and achievements
- **Catalog**: Product catalog with filtering
- **Contact**: Contact form and company details
- **Production**: Production process and technology
- **Retail**: Information for retail chains
- **Wholesale**: Wholesale buyer information
- **HoReCa**: Hotel, Restaurant, Catering segment
- **Export**: International export information
- **404**: Custom error page

### Technical Features
- Responsive design
- Form validation and submission
- Interactive product filtering
- Google Maps integration
- SEO optimized
- Fast loading times

## 🛠️ Development

### Adding New Languages

1. Create new language folder (e.g., `/de/` for German)
2. Copy and translate all HTML files
3. Update `language-switcher.js` with new language configuration
4. Update `_redirects` file with new language routes
5. Test all functionality

### Translation Guidelines

- Maintain consistent terminology across all pages
- Keep professional tone appropriate for B2B audience
- Preserve HTML structure and CSS classes
- Update meta tags, titles, and descriptions
- Translate form placeholders and validation messages
- Update alt texts for images

## 📧 Contact Forms

All contact forms are configured to work with Formspree:
- Form ID: `xjkapqqn`
- Automatic email notifications
- Success/error message handling
- Form validation

## 🎨 Styling

- Bootstrap 4 framework
- Custom CSS for language switcher
- Responsive design for all devices
- Font Awesome icons
- Google Fonts integration

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly navigation
- Optimized for mobile devices
- Fast loading on mobile networks

## 🔍 SEO

- Language-specific meta tags
- Proper hreflang attributes
- Optimized page titles and descriptions
- Structured data markup
- Fast loading times

## 📄 License

© 2025 Boletus-LT & Boletus. TM BoletusBerries, all rights reserved.

---

**Ready for Git deployment!** 🚀
