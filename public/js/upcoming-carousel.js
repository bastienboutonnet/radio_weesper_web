(function () {
    function init(el) {
        const track = el.querySelector('[data-upcoming-track]');
        const prev = el.querySelector('[data-upcoming-prev]');
        const next = el.querySelector('[data-upcoming-next]');
        if (!track) return;

        const getCardWidth = () => {
            const first = track.querySelector('.recent-post');
            if (!first) return 300;
            const style = getComputedStyle(first);
            const width = first.getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
            return width + gap;
        };

        function scrollByCards(dir) {
            const delta = getCardWidth() * (dir === 'next' ? 1 : -1);
            track.scrollBy({ left: delta, behavior: 'smooth' });
        }

        prev && prev.addEventListener('click', () => scrollByCards('prev'));
        next && next.addEventListener('click', () => scrollByCards('next'));

        // Show/hide nav depending on scroll position
        function atStart() {
            return track.scrollLeft <= 2;
        }
        function atEnd() {
            return Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2;
        }
        function hasOverflow() {
            return track.scrollWidth > track.clientWidth + 2;
        }
        function updateNav() {
            if (!hasOverflow()) {
                if (prev) prev.hidden = true;
                if (next) next.hidden = true;
                return;
            }
            if (prev) prev.hidden = atStart();
            if (next) next.hidden = atEnd();
        }
        track.addEventListener('scroll', () => requestAnimationFrame(updateNav));
        window.addEventListener('resize', () => requestAnimationFrame(updateNav));

        // Keyboard support
        el.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') scrollByCards('next');
            if (e.key === 'ArrowLeft') scrollByCards('prev');
        });

        // A11y
        track.setAttribute('role', 'region');
        track.setAttribute('aria-label', 'Upcoming shows');

        // Compute nav state after layout
        requestAnimationFrame(updateNav);
        // Update again after images load (widths may change)
        const imgs = track.querySelectorAll('img');
        imgs.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => requestAnimationFrame(updateNav));
                img.addEventListener('error', () => requestAnimationFrame(updateNav));
            }
        });
        // And after full window load as a last resort
        window.addEventListener('load', () => requestAnimationFrame(updateNav));
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-upcoming-carousel]').forEach(init);
    });
})();
