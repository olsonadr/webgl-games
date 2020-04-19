const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const solarButton = document.getElementById('solar');
const body = document.body;
const header = document.getElementById('header');


// Apply the cached theme on reload

const theme = localStorage.getItem('theme');
// const isSolar = localStorage.getItem('isSolar');
const isSolar = false;

if (theme) {
    body.classList.add(theme);
    isSolar && body.classList.add('solar');
}

// Button Event Handlers
var darken = function() {
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
    // $('#dark').attr('data-background', '#ffffff');
    // darkButton.before.style.background = '#ffffff';
    darkButton.classList.replace('darkB', 'lightB');
    darkButton.innerText = 'Lighten';
    darkButton.onclick = lighten;
}

var lighten = function() {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
    // $('#dark').attr('data-background', '#2a2e35');
    // darkButton.before.style.background = '#2a2e35';
    darkButton.classList.replace('lightB', 'darkB');
    darkButton.innerText = 'Darken';
    darkButton.onclick = darken;
}

$('document').ready(function() {
    if (typeof theme === 'undefined' || theme === 'light')
    {
        darkButton.classList.add('darkB');
        darkButton.innerText = 'Darken';
        darkButton.onclick = darken;
    }
    else
    {
        darkButton.classList.add('lightB');
        darkButton.innerText = 'Lighten';
        darkButton.onclick = lighten;
    }

    solarButton.onclick = () => {

        if (body.classList.contains('solar')) {

            body.classList.remove('solar');
            solarButton.style.cssText = `
        --bg-solar: var(--yellow);
        `

            solarButton.innerText = 'solarize';

            localStorage.removeItem('isSolar');

        } else {

            solarButton.style.cssText = `
        --bg-solar: white;
        `

            body.classList.add('solar');
            solarButton.innerText = 'normalize';

            localStorage.setItem('isSolar', true);
        }
    }

    body.classList.add('easeBG');
    header.classList.add('easeBG');
});