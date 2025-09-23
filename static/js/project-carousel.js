document.addEventListener('DOMContentLoaded', function() {
    // Handle all project cards
    document.querySelectorAll('[data-project-id]').forEach(projectCard => {
        const images = projectCard.querySelectorAll('.carousel-image');
        const dots = projectCard.querySelectorAll('.carousel-dot');
        const prevBtn = projectCard.querySelector('.carousel-prev');
        const nextBtn = projectCard.querySelector('.carousel-next');

        if (images.length <= 1) return;

        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('opacity-100', i === index);
                img.classList.toggle('opacity-0', i !== index);
                img.style.zIndex = i === index ? '5' : '4';
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === index);
                dot.classList.toggle('bg-white/50', i !== index);
            });

            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                showImage(newIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                showImage(newIndex);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showImage(index);
            });
        });

        // Auto-rotate images on hover
        let autoRotateInterval;
        projectCard.addEventListener('mouseenter', () => {
            autoRotateInterval = setInterval(() => {
                const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                showImage(newIndex);
            }, 3000);
        });

        projectCard.addEventListener('mouseleave', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
        });
    });
});