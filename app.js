let articlesData = [];
let currentFontSize = 18;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

fetch('articles.json')
  .then(res => res.json())
  .then(data => {
    articlesData = data;
    renderList(articlesData);
  });

function renderList(items) {
  const listEl = document.getElementById('articleList');
  listEl.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.onclick = () => openArticle(index);
    listEl.appendChild(li);
  });
}

function openArticle(index) {
  const item = articlesData[index];
  document.getElementById('articleTitle').textContent = item.title;
  document.getElementById('articleContent').innerHTML = item.content;
  document.getElementById('listView').classList.add('hidden');
  document.getElementById('detailView').classList.remove('hidden');
  window.scrollTo(0, 0);
}

document.getElementById('backBtn').onclick = () => {
  document.getElementById('detailView').classList.add('hidden');
  document.getElementById('listView').classList.remove('hidden');
};

document.getElementById('searchInput').oninput = (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = articlesData.filter(a => a.title.toLowerCase().includes(query));
  renderList(filtered);
};

document.getElementById('fontInc').onclick = () => {
  currentFontSize += 2;
  document.body.style.fontSize = currentFontSize + 'px';
};

document.getElementById('fontDec').onclick = () => {
  if (currentFontSize > 14) {
    currentFontSize -= 2;
    document.body.style.fontSize = currentFontSize + 'px';
  }
};

document.getElementById('themeToggle').onclick = () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
};
