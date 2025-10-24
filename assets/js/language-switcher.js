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
        this.initCurrentLanguage();
    }
    
    initCurrentLanguage() {
        // Determine current language from URL
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        let currentLang = 'ru'; // default
        
        if (pathParts[1] === 'en') {
            currentLang = 'en';
        } else if (pathParts[1] === 'it') {
            currentLang = 'it';
        } else if (pathParts[1] === 'pl') {
            currentLang = 'pl';
        }
        
        this.currentLanguage = currentLang;
        
        // No active state needed
        // document.querySelectorAll('.language-option').forEach(option => {
        //     option.classList.remove('active');
        //     if (option.dataset.lang === currentLang) {
        //         option.classList.add('active');
        //     }
        // });
    }
    
    positionDropdown(icon, dropdownMenu) {
        const iconRect = icon.getBoundingClientRect();
        const dropdownWidth = 220; // Same as CSS width
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
        
        // Store scroll position but don't block scrolling
        // document.body.style.position = 'fixed';
        // document.body.style.top = `-${this.scrollY}px`;
        // document.body.style.width = '100%';
        // document.body.style.overflow = 'hidden';
        
        // Check if we need to preserve menu visibility
        this.preserveMenuVisibility();
        
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
        
        // Add event listeners (only keyboard, no wheel blocking)
        document.addEventListener('keydown', this.preventKeyboardScroll, { passive: false });
    }
    
    // Enable scroll when language menu is closed
    enableScroll() {
        // No CSS to restore since we're not blocking scroll
        // document.body.style.position = '';
        // document.body.style.top = '';
        // document.body.style.width = '';
        // document.body.style.overflow = '';
        
        // Restore menu visibility if it was modified
        this.restoreMenuVisibility();
        
        // Remove event listeners
        if (this.preventKeyboardScroll) {
            document.removeEventListener('keydown', this.preventKeyboardScroll);
        }
        
        // No need to restore scroll position since we didn't block scrolling
        // if (this.scrollY !== undefined) {
        //     window.scrollTo(0, this.scrollY);
        // }
    }
    
    // Preserve menu visibility only when needed
    preserveMenuVisibility() {
        const stickyElement = document.getElementById('sticker');
        if (!stickyElement) return;
        
        // Check if user has scrolled down (not at top of page)
        const scrollTop = window.scrollY;
        const isScrolled = scrollTop > 100; // Only if scrolled more than 100px
        
        if (isScrolled) {
            // Store original state only if we're going to modify it
            this.originalMenuState = {
                position: stickyElement.style.position,
                top: stickyElement.style.top,
                zIndex: stickyElement.style.zIndex,
                width: stickyElement.style.width,
                isSticky: stickyElement.parentElement.classList.contains('is-sticky')
            };
            
            // Only force visibility if menu is not already properly positioned
            if (!this.originalMenuState.isSticky || this.originalMenuState.position !== 'fixed') {
                stickyElement.style.position = 'fixed';
                stickyElement.style.top = '0px';
                stickyElement.style.zIndex = '999';
                stickyElement.style.width = '100%';
                stickyElement.parentElement.classList.add('is-sticky');
            }
        }
    }
    
    // Restore menu visibility
    restoreMenuVisibility() {
        const stickyElement = document.getElementById('sticker');
        if (!stickyElement || !this.originalMenuState) return;
        
        // Restore original state
        stickyElement.style.position = this.originalMenuState.position;
        stickyElement.style.top = this.originalMenuState.top;
        stickyElement.style.zIndex = this.originalMenuState.zIndex;
        stickyElement.style.width = this.originalMenuState.width;
        
        // Clear stored state
        this.originalMenuState = null;
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
            
            // No active state needed
            // document.querySelectorAll('.language-option').forEach(option => {
            //     option.classList.remove('active');
            //     if (option.dataset.lang === langCode) {
            //         option.classList.add('active');
            //     }
            // });
            
            // Store language preference
            localStorage.setItem('selectedLanguage', langCode);
            
            // Show success message
            console.log(`Switched to ${currentLang.name}`);
            
            // Get current page path and redirect to language-specific version
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/');
            
            // Check if we're in a local file system (file:// protocol)
            const isLocalFile = window.location.protocol === 'file:';
            
            if (isLocalFile) {
                // For local files, navigate to the actual file path
                const currentFileName = pathParts[pathParts.length - 1];
                const targetPath = `../${langCode}/${currentFileName}`;
                window.location.href = targetPath;
            } else {
                // For web servers, use normal path logic
                let targetPath = '';
                
                // Check if we're already in a language-specific path
                if (pathParts[1] === 'ru' || pathParts[1] === 'en' || pathParts[1] === 'it' || pathParts[1] === 'pl') {
                    // Replace language in path
                    pathParts[1] = langCode;
                    targetPath = pathParts.join('/');
                } else {
                    // Add language to path
                    targetPath = `/${langCode}${currentPath}`;
                }
                
                // Redirect to the new language version
                window.location.href = targetPath;
            }
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
