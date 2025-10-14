// Language Switcher Component
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'ru';
        this.languages = {
            'ru': {
                name: 'Русский',
                flag: '🇷🇺',
                code: 'ru'
            },
            'en': {
                name: 'English',
                flag: '🇺🇸',
                code: 'en'
            },
            'it': {
                name: 'Italiano',
                flag: '🇮🇹',
                code: 'it'
            },
            'pl': {
                name: 'Polski',
                flag: '🇵🇱',
                code: 'pl'
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    positionDropdown(icon, dropdownMenu) {
        const iconRect = icon.getBoundingClientRect();
        const dropdownWidth = 280; // Same as CSS width
        const dropdownHeight = 200; // Approximate height
        const padding = 10;
        
        // Calculate position
        let top = iconRect.bottom + padding;
        let left = iconRect.right - dropdownWidth;
        
        // Ensure dropdown doesn't go off screen
        if (left < padding) {
            left = iconRect.left;
        }
        if (left + dropdownWidth > window.innerWidth - padding) {
            left = window.innerWidth - dropdownWidth - padding;
        }
        
        // If dropdown would go off bottom of screen, position it above the icon
        if (top + dropdownHeight > window.innerHeight - padding) {
            top = iconRect.top - dropdownHeight - padding;
        }
        
        // Apply position
        dropdownMenu.style.top = top + 'px';
        dropdownMenu.style.left = left + 'px';
        dropdownMenu.style.right = 'auto';
    }
    
    // Disable scroll when language menu is open
    disableScroll() {
        // Store current scroll position
        this.scrollY = window.scrollY;
        
        // Add CSS to prevent scrolling
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        
        // Prevent scroll with keyboard and handle ESC key
        this.preventKeyboardScroll = (e) => {
            const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up, page down, end, home, arrows
            if (keys.includes(e.keyCode)) {
                e.preventDefault();
            }
            // Handle ESC key to close menu
            if (e.keyCode === 27) { // ESC key
                const overlay = document.getElementById('languageDropdownOverlay');
                if (overlay && overlay.style.display === 'block') {
                    overlay.style.display = 'none';
                    this.enableScroll();
                }
            }
        };
        
        // Prevent wheel scroll
        this.preventWheelScroll = (e) => {
            e.preventDefault();
        };
        
        // Add event listeners
        document.addEventListener('keydown', this.preventKeyboardScroll, { passive: false });
        document.addEventListener('wheel', this.preventWheelScroll, { passive: false });
    }
    
    // Enable scroll when language menu is closed
    enableScroll() {
        // Remove CSS that prevents scrolling
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Remove event listeners
        if (this.preventKeyboardScroll) {
            document.removeEventListener('keydown', this.preventKeyboardScroll);
        }
        if (this.preventWheelScroll) {
            document.removeEventListener('wheel', this.preventWheelScroll);
        }
        
        // Restore scroll position
        if (this.scrollY !== undefined) {
            window.scrollTo(0, this.scrollY);
        }
    }
    
    bindEvents() {
        const searchIcons = document.querySelectorAll('.search-bar-icon');
        const overlay = document.getElementById('languageDropdownOverlay');
        const closeBtn = document.getElementById('closeLanguageBtn');
        const languageOptions = document.querySelectorAll('.language-option');
        const dropdownMenu = document.querySelector('.language-dropdown-menu');
        
        // Handle search icon clicks (now language icon)
        searchIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                if (overlay && dropdownMenu) {
                    this.positionDropdown(icon, dropdownMenu);
                    this.disableScroll(); // Disable scroll when opening menu
                    overlay.style.display = 'block';
                }
            });
        });
        
        // Close language dropdown
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (overlay) {
                    overlay.style.display = 'none';
                    this.enableScroll(); // Enable scroll when closing menu
                }
            });
        }
        
        // Close when clicking on overlay
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.style.display = 'none';
                    this.enableScroll(); // Enable scroll when closing menu
                }
            });
        }
        
        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = option.dataset.lang;
                this.switchLanguage(selectedLang);
                if (overlay) {
                    overlay.style.display = 'none';
                    this.enableScroll(); // Enable scroll when closing menu
                }
            });
        });
    }
    
    switchLanguage(langCode) {
        if (this.languages[langCode]) {
            this.currentLanguage = langCode;
            const currentLang = this.languages[langCode];
            
            // Update active state in dropdown
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.lang === langCode) {
                    option.classList.add('active');
                }
            });
            
            // Store language preference
            localStorage.setItem('selectedLanguage', langCode);
            
            // Show success message
            console.log(`Switched to ${currentLang.name}`);
            
            // Here you can add logic to actually change the page language
            // For example, redirect to language-specific pages or update content
            // window.location.href = `/${langCode}/current-page.html`;
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
