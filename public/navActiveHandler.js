function updateActiveNavLinks() {

    // Get the current path
    const currentPath = window.location.pathname;

    // Select all navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active-li');
    });

    // Add active class to the appropriate link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // For the root path, it must match exactly
        if (href === '/' && currentPath === '/') {
            link.classList.add('active');
            link.parentElement.classList.add('active-li');
        }

        // For other paths, check if the current path starts with the link href
        else if (href !== '/' && currentPath.startsWith(href)) {
            link.classList.add('active');
            link.parentElement.classList.add('active-li');
        }
    });
}

function listenForRouteChanges() {

    // Create a MutationObserver to detect when the body content changes
    const observer = new MutationObserver(mutations => {
        updateActiveNavLinks();
    });

    // Start observing the body for DOM changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Also listen for popstate events (browser back/forward buttons)
    window.addEventListener('popstate', updateActiveNavLinks);
}

// Wait for the DOM to be fully loaded before setting up listeners
document.addEventListener('DOMContentLoaded', function () {
    
    // Initial update of active links
    updateActiveNavLinks();

    // Set up listeners for route changes
    listenForRouteChanges();
});