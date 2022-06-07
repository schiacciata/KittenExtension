const sub = document.getElementById("sub");
const title = document.getElementById("title");
const image = document.getElementById("cat_img");
const button = document.getElementById("button");
import subs from './cat_subs.js';

const _randomKitten = () => `/src/img/kitten${Math.floor(Math.random() * 3)}.png`;

async function LoadImage() {

    let subreddit = localStorage.getItem('subreddit');
    if (!subreddit || subreddit == 'random') subreddit = subs[Math.floor(Math.random() * subs.length)];
    
    const res = await fetch(`https://www.reddit.com/r/${subreddit.toLowerCase()}.json`)
    .catch(() => _error());
    
    sub.innerHTML = sub.innerHTML.split('<a')[0] + `<a href="https://www.reddit.com/r/${subreddit}">/r/${subreddit}</a>`;

    if (!res.ok) return _error();
    
    const json = await res.json();

    const posts = json.data.children.filter(({ data }) => !data.over_18 && data.url.startsWith('https://i.redd.it/'));
    const random_post = Math.floor(Math.random() * posts.length);

    posts.length ? title.innerText = posts[random_post].data.title : title.innerText = "No posts found";

    image.src = posts[random_post]?.data?.url || _randomKitten();
    image.alt = `🐈‍⬛`;
};

function _error() {
    title.innerText = "No posts found";
    image.src = _randomKitten();
    image.alt = `🐈‍⬛`;
};

window.onload = LoadImage();
button.onclick = () => LoadImage();