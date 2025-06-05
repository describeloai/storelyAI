'use client';
import { useState } from 'react'; // Importing useState for potential search/filter functionality, though not fully implemented for brevity.
import { useDarkMode } from '@/context/DarkModeContext';
import React from 'react'; // For React.CSSProperties typing

export default function HelpAndSupportSettings() {
  const { darkMode } = useDarkMode();

  // Dummy data for demonstration purposes
  const faqs = [
    {
      id: 1,
      question: "How do I optimize product descriptions using AI?",
      answer: "Navigate to 'Product Settings', select the product, and use the 'Generate Description' AI tool. Experiment with keywords for better results."
    },
    {
      id: 2,
      question: "What integrations are available for my e-commerce platform?",
      answer: "We support integrations with Shopify, WooCommerce, and Magento. Go to 'Connections' in settings to link your store."
    },
    {
      id: 3,
      question: "How is billing handled for AI usage?",
      answer: "AI usage is billed based on the number of generated outputs and complexity. You can monitor your usage in the 'Billing' section."
    },
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: "Getting Started with AI Product Recommendations",
      summary: "A step-by-step guide to setting up and optimizing AI-powered product recommendations for your store."
    },
    {
      id: 2,
      title: "Understanding AI-Driven Content Generation",
      summary: "Learn how our AI crafts engaging product descriptions, marketing copy, and blog ideas."
    },
    {
      id: 3,
      title: "Integrating Your Store with Our Platform",
      summary: "Detailed instructions for connecting Shopify, WooCommerce, or Magento to unlock AI features."
    },
  ];

  // Common styles for sections
  const commonSectionStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: darkMode ? '1px solid #333' : '1px solid #eee',
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
    boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: darkMode ? '#f4f4f5' : '#111',
    borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd',
    paddingBottom: '0.5rem',
  };

  const textStyle: React.CSSProperties = {
    color: darkMode ? '#aaa' : '#555',
    marginBottom: '1rem'
  };

  const linkStyle = (dark: boolean): React.CSSProperties => ({
    color: dark ? '#3b82f6' : '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block'
  });

  const buttonStyle = (): React.CSSProperties => ({
    padding: '0.6rem 1.2rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
    color: '#fff',
    transition: 'background-color 0.2s ease-in-out',
    marginRight: '0.75rem',
  });

  const inputStyle = (dark: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '0.375rem',
    border: `1px solid ${dark ? '#444' : '#ddd'}`,
    backgroundColor: dark ? '#2a2a2a' : '#fff',
    color: dark ? '#eee' : '#333',
    boxSizing: 'border-box' // Include padding in the element's total width and height
  });

  const textareaStyle = (dark: boolean): React.CSSProperties => ({
    ...inputStyle(dark), // Inherit common input styles
    minHeight: '100px',
    resize: 'vertical',
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={titleStyle(darkMode)}>Help and Support</h3>
      <p style={descStyle(darkMode)}>
        Find answers to your questions, access detailed guides, and get in touch with our support team.
      </p>

      {/* 1. Search Bar */}
      <div style={{ ...commonSectionStyle, marginBottom: '2rem' }}>
        <h4 style={sectionTitleStyle}>Search Help Articles</h4>
        <input
          type="text"
          placeholder="Search for FAQs, articles, or keywords..."
          style={inputStyle(darkMode)}
          // In a real app, you'd add state and onChange handler for search
        />
        <button style={buttonStyle()}>Search</button>
      </div>

      {/* 2. Preguntas Frecuentes (FAQ) */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Frequently Asked Questions (FAQ)</h4>
        <p style={textStyle}>Browse common questions grouped by topics related to our platform.</p>
        <div>
          {faqs.map((faq) => (
            <div key={faq.id} style={{ marginBottom: '1rem', padding: '0.75rem', border: darkMode ? '1px solid #444' : '1px solid #eee', borderRadius: '0.375rem', backgroundColor: darkMode ? '#222' : '#fcfcfc' }}>
              <h5 style={{ color: darkMode ? '#f4f4f5' : '#111', fontSize: '1rem', marginBottom: '0.5rem' }}>{faq.question}</h5>
              <p style={{ color: darkMode ? '#ccc' : '#555', fontSize: '0.9rem' }}>{faq.answer}</p>
            </div>
          ))}
          {/* Link to full FAQ page if available */}
          <a href="/help/faq" style={linkStyle(darkMode)}>View all FAQs</a>
        </div>
      </div>

      {/* 3. Base de Conocimientos/Artículos */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Knowledge Base / Articles</h4>
        <p style={textStyle}>Detailed guides and tutorials to help you master every feature.</p>
        <div>
          {knowledgeArticles.map((article) => (
            <div key={article.id} style={{ marginBottom: '1rem', padding: '0.75rem', border: darkMode ? '1px solid #444' : '1px solid #eee', borderRadius: '0.375rem', backgroundColor: darkMode ? '#222' : '#fcfcfc' }}>
              <h5 style={{ color: darkMode ? '#f4f4f5' : '#111', fontSize: '1rem', marginBottom: '0.5rem' }}>{article.title}</h5>
              <p style={{ color: darkMode ? '#ccc' : '#555', fontSize: '0.9rem' }}>{article.summary}</p>
              {/* In a real app, this would link to the specific article page */}
              <a href={`/help/article/${article.id}`} style={linkStyle(darkMode)}>Read more</a>
            </div>
          ))}
          <a href="/help/articles" style={linkStyle(darkMode)}>Explore all articles</a>
        </div>
      </div>

      {/* 4. Glosario de Términos */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Glossary of Terms</h4>
        <p style={textStyle}>Understand key technical and AI/e-commerce specific terminology used in the application.</p>
        <a href="/help/glossary" style={linkStyle(darkMode)}>View Glossary</a>
      </div>

      {/* 5. Sistema de Tickets/Formulario de Contacto */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Contact Support</h4>
        <p style={textStyle}>
          For specific inquiries or issues, please fill out the form below. We aim to respond within 24-48 hours.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Support ticket submitted! (simulated)'); /* Add actual submission logic here */ }}>
          <input type="text" placeholder="Your Name" style={inputStyle(darkMode)} required />
          <input type="email" placeholder="Your Email" style={inputStyle(darkMode)} required />
          <input type="text" placeholder="Subject" style={inputStyle(darkMode)} required />
          <textarea placeholder="Describe your issue in detail..." style={textareaStyle(darkMode)} required></textarea>
          {/* Add file attachment input if needed */}
          <button type="submit" style={buttonStyle()}>Submit Ticket</button>
        </form>
      </div>

      {/* 6. Mejores Prácticas */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Best Practices & Guides</h4>
        <p style={textStyle}>
          Discover tips and strategies to leverage our AI functionalities for optimal online business performance.
        </p>
        <a href="/help/best-practices" style={linkStyle(darkMode)}>Explore Best Practices</a>
      </div>

      {/* 7. Solución de Problemas Comunes de IA */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Common AI Troubleshooting</h4>
        <p style={textStyle}>
          Guides to help you understand and resolve specific issues related to AI performance, such as relevance or accuracy.
        </p>
        <a href="/help/ai-troubleshooting" style={linkStyle(darkMode)}>View Troubleshooting Guides</a>
      </div>

      {/* 8. Opción para Dar Feedback */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Give Feedback</h4>
        <p style={textStyle}>
          Your feedback helps us improve! Share suggestions, report bugs, or request new features.
        </p>
        <button style={buttonStyle()} onClick={() => alert('Feedback form or modal would open here (simulated)!')}>
          Send Feedback
        </button>
      </div>

      {/* 9. Registro de Cambios (Changelog) */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Changelog</h4>
        <p style={textStyle}>
          Stay updated with the latest new features, improvements, and bug fixes in our application.
        </p>
        <a href="/changelog" style={linkStyle(darkMode)}>View Changelog</a>
      </div>

      {/* 10. Estado del Sistema (Status Page) */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>System Status</h4>
        <p style={textStyle}>
          Check the current operational status of our services and any scheduled maintenance.
        </p>
        <a href="https://your-status-page-url.com" target="_blank" rel="noopener noreferrer" style={linkStyle(darkMode)}>
          Go to Status Page (External Link)
        </a>
      </div>

      {/* 11. Blog/Artículos de la Empresa */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Our Blog</h4>
        <p style={textStyle}>
          Read relevant content on e-commerce trends, AI insights, and marketing strategies.
        </p>
        <a href="https://your-company-blog-url.com" target="_blank" rel="noopener noreferrer" style={linkStyle(darkMode)}>
          Visit Our Blog (External Link)
        </a>
      </div>

      {/* 12. Comunidad/Foro de Usuarios (Opcional) */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>User Community</h4>
        <p style={textStyle}>
          Connect with other users, share tips, and find solutions in our community forum.
        </p>
        <a href="https://your-community-forum-url.com" target="_blank" rel="noopener noreferrer" style={linkStyle(darkMode)}>
          Join the Community (External Link)
        </a>
      </div>
    </div>
  );
}

// Re-using common style functions from previous examples, ensuring React.CSSProperties typing
const titleStyle = (dark: boolean): React.CSSProperties => ({ fontSize: '1.5rem', marginBottom: '1rem', color: dark ? '#f4f4f5' : '#111' });
const descStyle = (dark: boolean): React.CSSProperties => ({ color: dark ? '#ccc' : '#555', marginBottom: '2rem' });