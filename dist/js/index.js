document.addEventListener('DOMContentLoaded', () => {
    //scroll
    const allowScroll = true
    const sections = document.querySelectorAll('section')
    const sectionLinks = document.querySelectorAll('.section-link')
    let selected = 0
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 100)

    const bottomArrows = document.querySelectorAll('.bottom-arrow')

    const scrollTop = () => {
        if (allowScroll) {
            window.scrollTo(0, sections[selected - 1].offsetTop)
            selected -= 1
        }
    }
    const scrollBottom = () => {
        if (allowScroll) {
            window.scrollTo(0, sections[selected + 1].offsetTop)
            selected += 1
        }
    }

    document.addEventListener('wheel', e => {
        if (e.deltaY > 0 && selected != sections.length - 1) {
            scrollBottom()
        }
        else if (e.deltaY < 0 && selected != 0) {
            scrollTop()
        }
    })

    bottomArrows.forEach(arrow => {
        arrow.addEventListener('click', e => {
            if (selected != sections.length - 1) {
                scrollBottom()
            }
        })
    })

    sectionLinks.forEach((link, index) => {
        link.addEventListener('click', e => {
            window.scrollTo(0, sections[index + 1].offsetTop)
            selected = index + 1
        })
    })


    //swipes
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                /* left swipe */
            } else {
                /* right swipe */
            }
        } else {
            if (yDiff > 0) {
                scrollBottom()
            } else {
                scrollTop()

            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

    //lightbox
    const projectPreviews = document.querySelectorAll('.lightbox')
    const overlay = document.querySelector('#overlay')
    overlay.addEventListener('click', e => {
        if (e.target.tagName !== 'VIDEO') {
            overlay.classList.toggle('shown')
            overlay.innerHTML = ''
        }
    })

    projectPreviews.forEach(preview => {
        preview.addEventListener('click', e => {
            overlay.classList.toggle('shown')
            const link = e.target.dataset.link
            const video = document.createElement('video')
            const source = document.createElement('source')
            source.src = link
            video.controls = true
            video.appendChild(source)
            overlay.appendChild(video)
        })
    })

})