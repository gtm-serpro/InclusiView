import * as axe from 'axe-core';
import ptBR from 'axe-core/locales/pt_BR.json';

// Configure axe-core with Portuguese locale
axe.configure({
  locale: ptBR, // Use the locale directly
});


export const performAccessibilityCheck = async (html: string) => {
    // Create a container that will be removed after analysis
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  
    try {
      return await new Promise((resolve, reject) => {
        axe.run(
          container,
          {
            runOnly: ['wcag2a', 'wcag2aa'], // Focus only on WCAG 2.0 A and AA criteria
            resultTypes: ['violations', 'incomplete', 'inapplicable'], // Include different result types
          },
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    } finally {
      // Clean up container from the DOM
      document.body.removeChild(container);
    }
  };
  