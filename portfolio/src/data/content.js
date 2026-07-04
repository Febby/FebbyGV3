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
    context:
      'After a third-party upsell app was installed, the theme\'s cart drawer stopped opening. Add-to-cart appeared to work, but customers got no visual feedback and were adding the same item multiple times.',
    approach:
      'I reproduced the issue on mobile and desktop, then used the browser console and breakpoints to trace the execution order. The theme\'s cart drawer initializer was being overridden by the app\'s asynchronous embed script. I isolated the conflicting listener and adjusted the initialization sequence so both scripts could coexist.',
    outcome:
      'Cart drawer opened reliably again and duplicate cart additions dropped. The merchant could keep the upsell app running, and I documented the root cause for the support team.',
    tech: ['Shopify Themes', 'Liquid', 'JavaScript', 'App Embeds', 'Browser DevTools'],
  },
  {
    title: 'Customizing Candy Rack Upsell Popup Behavior',
    context:
      'A merchant wanted the Candy Rack upsell popup to fire only on specific product pages and not repeat within the same browsing session. The default trigger was appearing on every page load, which was disruptive for returning visitors.',
    approach:
      'I reviewed the trigger rules and available custom JavaScript hooks in Candy Rack, then added page-level checks and a sessionStorage flag. I also tested the popup against the theme\'s variant-change events to make sure it stayed in sync with the selected product.',
    outcome:
      'The popup now triggers in the right context only and respects the session flag. The merchant received fewer complaints about intrusive popups while keeping upsell visibility intact.',
    tech: ['Candy Rack', 'JavaScript', 'sessionStorage', 'Shopify Liquid'],
  },
  {
    title: 'Fixing Gift Box Free Gift Validation',
    context:
      'A store running Gift Box had a free gift appearing in the cart even when the cart total hadn\'t reached the qualifying threshold. The issue resurfaced whenever customers updated quantities on the AJAX cart.',
    approach:
      'I checked the app\'s cart-value rules and found the threshold check was not being enforced on every cart-update event. I corrected the configuration and added a lightweight client-side validation snippet that re-evaluates the threshold after each cart change.',
    outcome:
      'Free gift logic now matched the promotion rules consistently. The merchant could run the campaign confidently and support tickets related to unexpected gifts decreased.',
    tech: ['Gift Box', 'Shopify AJAX Cart', 'JavaScript', 'Liquid'],
  },
  {
    title: 'Troubleshooting a Shopify App Embed on a Live Theme',
    context:
      'A newly installed app embed was not rendering on the live theme even though it was enabled in the theme editor. Hard-refreshing and clearing cache did not change the result.',
    approach:
      'I verified the embed block placement in theme.liquid, checked the app block schema and settings, and looked for conditional Liquid tags that might hide the block. I also inspected the console for CSP errors or script-loading failures and compared the behavior against a fresh theme preview.',
    outcome:
      'The embed rendered correctly after resolving a theme-specific conflict. I gave the merchant a short checklist to verify future app installs before reaching out to support.',
    tech: ['Shopify App Embeds', 'Liquid', 'Theme Customization', 'Browser DevTools'],
  },
  {
    title: 'Building a Responsive React Service Showcase',
    context:
      'A client needed a fast, mobile-friendly site to present their services, with content they could update without rebuilding the entire application or touching code.',
    approach:
      'I built a single-page React application with Vite, used Tailwind CSS for responsive styling, and structured the content as a static data layer separate from the components. I also added lazy loading for images and route-level code splitting where it helped performance.',
    outcome:
      'The client received a clean, maintainable site and could update service details by editing a single data file. Future content changes became straightforward and did not require a developer.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
  },
];

export const blogPosts = [
  {
    title: 'How to Debug Shopify Cart Drawer Issues',
    excerpt:
      'A practical walkthrough of the most common cart drawer problems in Shopify themes — from JavaScript conflicts to app embed timing issues — and how to fix them.',
    category: 'Shopify',
    label: 'New guide',
    slug: 'debug-shopify-cart-drawer-issues',
  },
  {
    title: 'Useful JavaScript Snippets for Shopify Stores',
    excerpt:
      'A collection of reusable JavaScript snippets for common Shopify customizations: cart attribute updates, variant switching, sticky headers, and more.',
    category: 'JavaScript',
    label: 'New guide',
    slug: 'javascript-snippets-shopify-stores',
  },
  {
    title: 'Lessons From Supporting Shopify Merchants',
    excerpt:
      'What I have learned from troubleshooting hundreds of Shopify support tickets — patterns, common mistakes, and how to communicate technical fixes clearly.',
    category: 'Shopify',
    label: 'Field note',
    slug: 'lessons-supporting-shopify-merchants',
  },
  {
    title: 'Building a Fast Portfolio With Modern Front-End Tools',
    excerpt:
      'How I rebuilt my portfolio using Astro and Tailwind CSS — the decisions I made, the tradeoffs, and what makes this stack great for developer portfolios.',
    category: 'Front-End',
    label: 'Field note',
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
