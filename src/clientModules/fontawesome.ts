import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createRoot } from 'react-dom/client';
import React from 'react';

// Add icons to the library
library.add(faDownload, faGithub);

// Add Font Awesome icons to navbar links
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const addIcons = () => {
      // Add download icon to Resume link
      const resumeLink = document.getElementById('navbar-resume-link');
      if (resumeLink && !resumeLink.querySelector('.fa-download-icon')) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'fa-download-icon';
        iconSpan.style.marginLeft = '0.5rem';
        resumeLink.appendChild(iconSpan);
        
        const root = createRoot(iconSpan);
        root.render(React.createElement(FontAwesomeIcon, { icon: faDownload }));
      }

      // Add GitHub icon to GitHub link
      const githubLink = document.getElementById('navbar-github-link');
      if (githubLink && !githubLink.querySelector('.fa-github-icon')) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'fa-github-icon';
        iconSpan.style.marginLeft = '0.5rem';
        githubLink.appendChild(iconSpan);
        
        const root = createRoot(iconSpan);
        root.render(React.createElement(FontAwesomeIcon, { icon: faGithub }));
      }
    };

    // Try adding icons immediately
    addIcons();

    // Also try after a short delay (for client-side navigation)
    setTimeout(addIcons, 100);
    
    // Watch for navigation changes
    const observer = new MutationObserver(addIcons);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

