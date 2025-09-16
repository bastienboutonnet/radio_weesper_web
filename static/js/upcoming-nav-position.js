// Positions the upcoming carousel nav buttons just below the image area while keeping them visible
(function () {
    const root = document;
    function positionNav() {
        const carousel = root.querySelector('.upcoming-carousel');
        const track = root.querySelector('[data-upcoming-track]');
        if (!carousel || !track) return;

        // Find the first card image inside the track
        const firstCard = track.querySelector('.recent-post');
        if (!firstCard) return;
        const img = firstCard.querySelector('img');

        // Compute the desired top position relative to the carousel
        // Fallback to 50% center if we can't measure the image
        let topPercent = 50;
        try {
            const carouselRect = carousel.getBoundingClientRect();
            const cardRect = firstCard.getBoundingClientRect();
            let imageBottom = cardRect.top; // default to card top
            if (img) {
                const imgRect = img.getBoundingClientRect();
                imageBottom = imgRect.bottom;
            } else {
                // If no image, assume top 56.25% (16:9) of the card is the image area
                imageBottom = cardRect.top + cardRect.height * 0.5625;
            }
            const offsetFromCarouselTop = imageBottom - carouselRect.top;
            topPercent = (offsetFromCarouselTop / carouselRect.height) * 100;
            // Add a small gap below the image
            const gapPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-2')) || 8;
            topPercent = ((offsetFromCarouselTop + gapPx) / carouselRect.height) * 100;
            // Clamp within [10%, 90%] to keep it visible
            topPercent = Math.max(10, Math.min(90, topPercent));
        } catch (_) {
            // ignore and use fallback
        }

        carousel.style.setProperty('--upcoming-nav-top', topPercent + '%');
        // Ensure translateY accounts for percentage-based top anchoring
        carousel.style.setProperty('--upcoming-nav-translateY', '0');
    }

    function onReady() {
        positionNav();
        window.addEventListener('resize', positionNav, { passive: true });
        // Reposition once images load
        const track = root.querySelector('[data-upcoming-track]');
        if (track) {
            const imgs = track.querySelectorAll('img');
            imgs.forEach((img) => {
                if (!img.complete) {
                    img.addEventListener('load', positionNav, { once: true });
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }
})();
