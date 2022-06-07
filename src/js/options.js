const selection = document.getElementById('selection');
const button = document.getElementById('submit');
import subs from './cat_subs.js';

let subreddit = localStorage.getItem('subreddit');
if (!subreddit) subreddit = subs[Math.floor(Math.random() * subs.length)];

["random", ...subs].forEach(sub => {
    const option = document.createElement('option');
    if (sub === subreddit) option.selected = true;
    option.value = sub;
    option.textContent = sub;
    option.id = sub;
    selection.appendChild(option);
});

button.addEventListener('click', () => {
    subreddit = selection.value;
    localStorage.setItem('subreddit', subreddit);
    location.reload();
});