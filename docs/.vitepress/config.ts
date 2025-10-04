import { defineConfig } from "vitepress";

const isProd = process.env["NODE_ENV"] === "production";

export default defineConfig({
  title: "Redactum",
  description: "Fast, zero-dependency PII redaction library for TypeScript/JavaScript",
  
  base: isProd ? "/redactum/" : "/",
  cleanUrls: true,
  
  head: [
    ["meta", { name: "theme-color", content: "#646cff" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Redactum - PII Redaction Library" }],
    ["meta", { property: "og:description", content: "Protect sensitive data in AI prompts" }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap', rel: 'stylesheet' }]
  ],
  
  themeConfig: {
    outline: {
      level: [2, 3]
    },

    nav: [
      { text: "Guide", link: "/" },
      { text: "Reference", link: "/api/" },
      { text: "GitHub", link: "https://github.com/alexwhin/redactum" }
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "About", link: "/" },
          { text: "Install", link: "/guide/install" },
          { text: "Usage", link: "/guide/usage" },
          { text: "Providers", link: "/guide/providers" }
        ]
      },
      {
        text: "Reference",
        items: [
          { text: "Options", link: "/api/" },
          { text: "Policies", link: "/api/policies" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/alexwhin/redactum" },
      { icon: "npm", link: "https://www.npmjs.com/package/redactum" }
    ],

    footer: {
      message: `Released under the <a href="https://github.com/alexwhin/redactum/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a> • Built by <a href="https://github.com/alexwhin" target="_blank" rel="noopener">Alex Whinfield</a>`
    },

    search: {
      provider: "local"
    }
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark"
    }
  }
});