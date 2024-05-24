// for topLogo and heading
document.addEventListener("DOMContentLoaded", function() {
    const iconset = document.getElementById("iconset");
    
    // Trigger the animation
    requestAnimationFrame(() => {
        iconset.style.opacity = 1;
        iconset.style.transform = 'translateX(0)';
    });
});

// for form main
document.addEventListener("DOMContentLoaded", function() {
    const iconset = document.getElementById("submain");
    
    // Trigger the animation
    requestAnimationFrame(() => {
        iconset.style.opacity = 1;
        iconset.style.transform = 'translateY(0)';
    });
});

// for footer
document.addEventListener("DOMContentLoaded", function() {
    const iconset = document.getElementById("footer");
    
    // Trigger the animation
    requestAnimationFrame(() => {
        iconset.style.opacity = 1;
        iconset.style.transform = 'translateY(0)';
    });
});
