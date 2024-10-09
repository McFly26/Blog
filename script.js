var html = document.documentElement;
var body = document.body;

var scroller = {
    target: document.querySelector("#scroll-box"),
    ease: 0.07,  // Velocidad de desplazamiento suave
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
};

var requestId = null;

gsap.set(scroller.target, {
    rotation: 0.01,
    force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {
    updateScroller();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
}

function updateScroller() {
    var resized = scroller.resizeRequest > 0;
    
    if (resized) {
        var height = scroller.target.clientHeight;
        body.style.height = height + "px";
        scroller.resizeRequest = 0;
    }
    
    var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
    
    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;
    
    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
    }
    
    gsap.set(scroller.target, {
        y: -scroller.y
    });
    
    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

// ---------------------------------------------------------------
                // CLASES ITEMS ANIMACTION
// ---------------------------------------------------------------
function filterClassrooms(category) {
    const items = document.querySelectorAll('.classrooms-item');

    const buttons = document.querySelectorAll('.button'); 
 
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = Array.from(buttons).find(button => button.getAttribute('onclick').includes(category));
    if (activeButton) {
        activeButton.classList.add('active'); 
    }

    items.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            item.classList.remove('hide');  
 
            setTimeout(() => {
                item.classList.add('show');  
            }, 10);
        } else {
            item.classList.remove('show');  
             setTimeout(() => {
                item.classList.add('hide'); 
            }, 10);
        }
    });

     const container = document.querySelector('.classrooms-items');
    container.style.justifyContent = 'center';  
    container.style.flexDirection = 'row';  
}

 
window.onload = function() {
    filterClassrooms('csharp'); 
};


  