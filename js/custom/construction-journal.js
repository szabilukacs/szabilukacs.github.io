/* ===== Construction Journal – Timeline + Swiper 3.x Gallery ===== */
(function () {
    'use strict';

    var section = document.querySelector('.cj-section');
    if (!section) return;

    var milestones = section.querySelectorAll('.cj-milestone');
    var panels     = section.querySelectorAll('.cj-gallery-panel');
    var swipers    = {};

    function activate(idx) {
        // Update milestones
        for (var i = 0; i < milestones.length; i++) {
            milestones[i].classList.remove('active', 'passed');
            if (i === idx)      milestones[i].classList.add('active');
            else if (i < idx)   milestones[i].classList.add('passed');
        }

        // Update panels
        for (var j = 0; j < panels.length; j++) {
            panels[j].classList.remove('active');
        }
        if (panels[idx]) {
            panels[idx].classList.add('active');
        }

        // Initialize Swiper 3.x for this panel if not already done
        var phaseKey = milestones[idx].getAttribute('data-phase');
        if (!swipers[phaseKey]) {
            var panel = panels[idx];
            if (!panel) return;
            var container = panel.querySelector('.swiper-container');
            if (container && typeof Swiper !== 'undefined') {
                var panelId = 'cj-panel-' + phaseKey;
                container.id = panelId;

                swipers[phaseKey] = new Swiper('#' + panelId, {
                    loop: true,
                    speed: 500,
                    spaceBetween: 0,
                    grabCursor: true,
                    nextButton: '#' + panelId + ' .cj-nav-next',
                    prevButton: '#' + panelId + ' .cj-nav-prev',
                    pagination: '#' + panelId + ' .cj-pagination',
                    paginationClickable: true
                });
            }
        }

        // Mobile: scroll active milestone into view
        if (window.innerWidth <= 767) {
            milestones[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    // Click handlers
    for (var k = 0; k < milestones.length; k++) {
        (function (index) {
            milestones[index].addEventListener('click', function () {
                activate(index);
            });
        })(k);
    }

    // Activate first milestone
    activate(0);

})();
