document.addEventListener("DOMContentLoaded", function () {
    let slides = document.getElementsByClassName('typewriter-slide');
    for (var i = 0; i < slides.length; i++) {
        let slide = slides[i];
        let foundElement = findElementClassName(slide, 'typewriter-content');
        if (foundElement) {
            // addOnActiveListener(slide, function () {console.log('Slide loaded')})
            addOnActiveListener(slide, function () {
                console.log('Slide loaded');
                startTypeWriter(foundElement);
            })
        }
    }
})

function findElementClassName(element, className) {
    let foundElement = element.getElementsByClassName(className);
    if (foundElement.length) return foundElement[0];
    if (element.children.length > 0) {
        for (var i = 0; i < element.children.length; i++) {
            let childElement = element.children[i];
            let foundInnerElement = findElementClassName(childElement, className);
            if (foundInnerElement) return foundInnerElement[0];
        }
    }
    console.error('Element no found');
    return undefined;
}


function addOnActiveListener(elem, callback) {
    let watch = window.setInterval(function () {
        if (elem.className.includes('active')) {
            clearInterval(watch);
            callback();
        }
    }, 50);
}


function startTypeWriter(element) {
    let str = element.innerHTML;
    element.innerHTML = '';
    element.removeAttribute('hidden');
    type(element, str, 0, undefined, undefined)
}

// author Tachun Lin: https://stackoverflow.com/questions/22180457/typewriter-effect-for-html-with-javascript
function type(element, finalString, i, isTag, currentString) {
    currentString = finalString.slice(0, ++i);
    if (currentString === finalString) return;

    element.innerHTML = currentString;

    var char = currentString.slice(-1);
    if (char === '<') isTag = true;
    if (char === '>') isTag = false;

    if (isTag) return type(element, finalString, i, isTag, currentString);
    setTimeout(function () {
        type(element, finalString, i, isTag, currentString)
    }, 10);
}
