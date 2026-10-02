import { initMobileMenu } from './components/mobile-menu';

function initTheme(): void {
  console.log('Shopify theme TypeScript loaded');

  initMobileMenu();
}

document.addEventListener('DOMContentLoaded', initTheme);
