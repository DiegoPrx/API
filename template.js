// template.js — ejemplo mínimo para separar JS del HTML
// Muestra cómo inyectar resultados, manejar debounce y favoritos (localStorage)

(() => {
  const q = document.getElementById('q');
  const resultados = document.getElementById('resultados');
  const listaFav = document.getElementById('lista-fav');
  const contador = document.getElementById('contador');
  const clearBtn = document.getElementById('clear');

  let favs = [];
  try { favs = JSON.parse(localStorage.getItem('plantilla_favs')) || []; } catch(e) { favs = []; }
  renderFavs();

  function setFavs(newFavs){
    favs = newFavs;
    localStorage.setItem('plantilla_favs', JSON.stringify(favs));
    renderFavs();
  }

  function renderFavs(){
    listaFav.innerHTML = '';
    contador.textContent = favs.length;
    favs.forEach(s => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${s.image || '/default.jpg'}" alt=""><div><strong>${s.name}</strong></div><button class=\"t-btn-ghost\">Ver</button>`;
      listaFav.appendChild(li);
    });
  }

  // debounce
  let tId = null;
  q.addEventListener('input', () => {
    clearTimeout(tId);
    tId = setTimeout(() => doSearch(q.value.trim()), 500);
  });

  clearBtn.addEventListener('click', () => { q.value = ''; doSearch(''); });

  async function doSearch(term){
    resultados.innerHTML = '';
    if (!term) return;
    resultados.innerHTML = '<p class="t-note">Buscando…</p>';
    try{
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      resultados.innerHTML = '';
      data.map(d => d.show).forEach(s => {
        const card = document.createElement('article');
        card.className = 't-card';
        card.innerHTML = `
          <div class="t-thumb"><img src="${s.image?.medium || '/default.jpg'}" alt="${s.name}"></div>
          <h4>${s.name}</h4>
          <p>${(s.summary || '').replace(/<[^>]*>?/gm,'').slice(0,120)}${(s.summary||'').length>120?'…':''}</p>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="t-btn" data-id="${s.id}">Favorito</button>
            <button class="t-btn-ghost" data-view="${s.id}">Ver</button>
          </div>
        `;
        resultados.appendChild(card);
        // bind favorito
        card.querySelector('[data-id]')?.addEventListener('click', ()=>{
          if (favs.some(f=>f.id===s.id)) setFavs(favs.filter(f=>f.id!==s.id));
          else setFavs([...favs, { id:s.id, name:s.name, image: s.image?.medium }]);
        });
      });
    }catch(e){ resultados.innerHTML = '<p class="t-note">Error buscando. Intenta de nuevo.</p>' }
  }

})();
