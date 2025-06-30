const apiKey= 'ec1cb048535e70951d4b02ece31a36d9'; 
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const categoryList = document.getElementById('categoryList');

// Load default category
window.addEventListener('DOMContentLoaded', () => fetchNews('technology'));

// Fetch news articles by category or search
function fetchNews(query) {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderNews(data.articles);
    })
    .catch(err => {
      newsContainer.innerHTML = '<p>Error fetching news. Check API key.</p>';
    });
}

// Render news cards to the DOM
function renderNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  });
}

// Event: Search Input
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchNews(searchInput.value.trim());
  }
});

// Event: Category Click
categoryList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('#categoryList li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    fetchNews(e.target.dataset.category);
  }
});

