export const services = [
  {
    title: 'Shopify Troubleshooting',
    description:
      'Diagnosing and fixing cart drawer conflicts, app integration issues, theme bugs, and storefront JavaScript errors.',
    icon: '🛒',
  },
  {
    title: 'Front-End Development',
    description:
      'Building responsive, accessible, and performant websites using HTML, CSS, JavaScript, and React.',
    icon: '💻',
  },
  {
    title: 'Cart Drawer & App Integration Fixes',
    description:
      'Resolving conflicts between Shopify apps (Candy Rack, Gift Box, etc.) and cart drawer or checkout flows.',
    icon: '🔧',
  },
  {
    title: 'Landing Pages & Portfolio Websites',
    description:
      'Designing and developing clean, conversion-focused landing pages and personal portfolio sites.',
    icon: '🎨',
  },
  {
    title: 'Technical Documentation & Support Content',
    description:
      'Writing clear technical guides, troubleshooting docs, and support articles for developers and merchants.',
    icon: '📝',
  },
  {
    title: 'UX Improvements',
    description:
      'Identifying and fixing usability issues on eCommerce storefronts and web applications.',
    icon: '✨',
  },
];

export const caseStudies = [
  {
    title: 'Resolving Shopify Cart Drawer Conflicts',
    problem:
      'A merchant\'s cart drawer stopped opening after a third-party upsell app was installed. No visible error was shown in the storefront, making it harder to diagnose.',
    solution:
      'I investigated the browser console and identified a JavaScript event listener collision between the theme and the app embed script. The approach was to isolate the conflicting function and adjust the initialization order.',
    outcome:
      'This helped restore the cart drawer to working order while keeping the upsell app active. The merchant was unblocked and the issue was documented for future reference.',
    tech: ['Shopify', 'JavaScript', 'Theme Customization', 'Browser DevTools'],
  },
  {
    title: 'Customizing Upsell Popup Behavior with Candy Rack',
    problem:
      'A store had a Candy Rack popup triggering on every page load, which was creating a disruptive experience for returning visitors.',
    solution:
      'I investigated the trigger logic and modified it using custom JavaScript to fire only on product pages after user interaction. A session-based flag was added to suppress repeat popups within the same visit.',
    outcome:
      'This helped reduce the frequency of unwanted popup triggers. The merchant received fewer support complaints related to the popup behavior.',
    tech: ['Candy Rack', 'JavaScript', 'Shopify', 'sessionStorage'],
  },
  {
    title: 'Fixing Free Gift Validation Flow',
    problem:
      'A store using Gift Box had a validation issue where the free gift was appearing in the cart even when the cart total hadn\'t reached the qualifying threshold.',
    solution:
      'I investigated the app configuration and found a misconfigured cart value rule. The approach was to correct the settings and add a lightweight client-side validation snippet to enforce the threshold check.',
    outcome:
      'This helped bring the free gift logic in line with the intended promotion rules. The merchant was able to continue running the campaign with confidence.',
    tech: ['Gift Box', 'Shopify', 'JavaScript', 'Liquid'],
  },
  {
    title: 'Building a Responsive React Application',
    problem:
      'A client needed a fast, mobile-friendly web app to showcase their services, with content that was easy to update without a full rebuild.',
    solution:
      'I built a single-page React application using a component-based structure, Tailwind for responsive styling, and a simple static data layer to keep content editable.',
    outcome:
      'This helped deliver a clean, maintainable site the client could manage themselves. The structure made future updates straightforward.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Vite'],
  },
  {
    title: 'WordPress Client Website Rebuild',
    problem:
      'A small business had an outdated WordPress site with slow load times, a broken mobile layout, and no clear way for visitors to get in touch.',
    solution:
      'I rebuilt the theme using a lightweight starter, optimized images and fonts, restructured the layout for mobile-first, and added visible CTA sections on key pages.',
    outcome:
      'This helped improve both the load time and the mobile experience. The client reported seeing more enquiries through the updated contact section.',
    tech: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
  },
];

export const blogPosts = [
  {
    title: 'How to Debug Shopify Cart Drawer Issues',
    excerpt:
      'A practical walkthrough of the most common cart drawer problems in Shopify themes — from JavaScript conflicts to app embed timing issues — and how to fix them.',
    category: 'Shopify',
    date: '2025-06-01',
    slug: 'debug-shopify-cart-drawer-issues',
  },
  {
    title: 'Useful JavaScript Snippets for Shopify Stores',
    excerpt:
      'A collection of reusable JavaScript snippets for common Shopify customizations: cart attribute updates, variant switching, sticky headers, and more.',
    category: 'JavaScript',
    date: '2025-07-15',
    slug: 'javascript-snippets-shopify-stores',
  },
  {
    title: 'Lessons From Supporting Shopify Merchants',
    excerpt:
      'What I have learned from troubleshooting hundreds of Shopify support tickets — patterns, common mistakes, and how to communicate technical fixes clearly.',
    category: 'Shopify',
    date: '2025-08-20',
    slug: 'lessons-supporting-shopify-merchants',
  },
  {
    title: 'Building a Fast Portfolio With Modern Front-End Tools',
    excerpt:
      'How I rebuilt my portfolio using Astro and Tailwind CSS — the decisions I made, the tradeoffs, and what makes this stack great for developer portfolios.',
    category: 'Front-End',
    date: '2025-09-10',
    slug: 'fast-portfolio-modern-frontend-tools',
  },
];

export const resources = [
  {
    title: 'Shopify Debugging Checklist',
    description:
      'A step-by-step checklist for diagnosing common Shopify front-end issues: cart, apps, theme conflicts, and JavaScript errors.',
    status: 'coming-soon',
  },
  {
    title: 'JavaScript Snippet Library for Shopify',
    description:
      'A curated set of copy-paste JavaScript snippets for Shopify store customizations, tested and documented.',
    status: 'coming-soon',
  },
  {
    title: 'Portfolio Starter Template',
    description:
      'A clean Astro + Tailwind portfolio template for developers. Designed to be fast, accessible, and easy to customize.',
    status: 'coming-soon',
  },
  {
    title: 'Front-End Troubleshooting Guide',
    description:
      'A practical reference guide for debugging front-end issues in eCommerce stores and web applications.',
    status: 'coming-soon',
  },
  {
    title: 'Recommended Tools & Resources',
    description:
      'The tools, extensions, and resources I use daily for front-end development, Shopify work, and productivity.',
    status: 'coming-soon',
  },
];

export const skillGroups = [
  {
    title: 'Front-End',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Astro'],
  },
  {
    title: 'Styling',
    skills: ['Tailwind CSS', 'SCSS', 'Responsive Design', 'CSS Grid', 'Flexbox'],
  },
  {
    title: 'Shopify',
    skills: [
      'Shopify Themes',
      'Liquid',
      'AJAX Cart',
      'App Embeds',
      'Candy Rack',
      'Gift Box',
      'Storefront Debugging',
    ],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'WordPress', 'VS Code', 'Figma', 'Browser DevTools'],
  },
  {
    title: 'Support & Communication',
    skills: [
      'Merchant Support',
      'Technical Documentation',
      'Troubleshooting',
      'Client Communication',
    ],
  },
];
