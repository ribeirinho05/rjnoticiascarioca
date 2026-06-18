/* RJ NOTÍCIAS CARIOCA — Main JS (tropical modern, sem sidebar) */
(function() {
    'use strict';

    window.addEventListener('load', function() {
        var l = document.getElementById('loading-screen');
        if (l) l.classList.add('hidden');
    });

    var page = 1, perPage = 20, curCat = 'todas', curTab = 'recentes';
    var news = typeof noticias !== 'undefined' ? noticias : [];
    var vids = typeof videos !== 'undefined' ? videos : [];

    document.addEventListener('DOMContentLoaded', function() {
        initClock(); initTheme(); initWeatherTop(); initHero(); initTicker();
        initQuotes(); initTrending(); initCards(); initCatBlocks(); initVideos();
        initSearch(); initNav(); initShare(); initLoadMore(); initTabs();
        initReadingBar(); initMobileNav();
    });

    function initClock() {
        function u() {
            var n = new Date();
            var dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
            var meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
            var d = document.getElementById('topbar-date');
            var c = document.getElementById('topbar-clock');
            if (d) d.textContent = dias[n.getDay()] + ', ' + n.getDate() + ' ' + meses[n.getMonth()] + ' ' + n.getFullYear();
            if (c) c.textContent = n.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
        }
        u(); setInterval(u, 1000);
    }

    function initTheme() {
        var btn = document.getElementById('btn-theme');
        var saved = localStorage.getItem('rjnoticias-theme');
        if (saved) document.documentElement.setAttribute('data-theme', saved);
        if (btn) btn.addEventListener('click', function() {
            var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('rjnoticias-theme', t);
        });
    }

    function initWeatherTop() {
        var el = document.getElementById('topbar-temp');
        var c = typeof clima !== 'undefined' ? clima : null;
        if (el && c) {
            el.textContent = c.temperatura + '° ' + (c.condicao || '');
        }
    }

    function initHero() {
        var el = document.getElementById('hero-section');
        if (!el || !news.length) return;
        var top = news.filter(function(n) { return n.destaque; });
        if (top.length < 3) top = news.slice(0, 3);
        var cats = typeof CATEGORIAS !== 'undefined' ? CATEGORIAS : {};
        var items = top.slice(0, 3);
        el.innerHTML = '<div class="hero-grid">' +
            '<div class="hero-main" data-id="' + items[0].id + '">' +
                '<img src="' + items[0].imagem + '" alt="">' +
                '<div class="hero-overlay"><span class="hero-badge">' + esc((cats[items[0].categoria]||{}).nome || items[0].categoria) + '</span>' +
                '<div class="hero-title">' + esc(items[0].titulo) + '</div>' +
                '<div class="hero-meta">' + esc(items[0].autor) + ' &bull; ' + items[0].tempo + '</div></div></div>' +
            '<div class="hero-side">' +
            items.slice(1, 3).map(function(n) {
                var ci = cats[n.categoria] || {nome: n.categoria};
                return '<div class="hero-side-card" data-id="' + n.id + '">' +
                    '<img src="' + n.imagem + '" alt="">' +
                    '<div class="hero-overlay"><span class="hero-badge">' + esc(ci.nome || n.categoria) + '</span>' +
                    '<div class="hero-title">' + esc(n.titulo) + '</div></div></div>';
            }).join('') +
            '</div></div>';
        el.querySelectorAll('[data-id]').forEach(function(c) {
            c.addEventListener('click', function() {
                window.location.href = 'noticia.html?id=' + this.getAttribute('data-id');
            });
        });
    }

    function initTicker() {
        var el = document.getElementById('ticker-text');
        var bar = document.getElementById('ticker');
        var items = typeof breakingNews !== 'undefined' ? breakingNews : [];
        if (!el || !items.length) { if (bar) bar.style.display = 'none'; return; }
        el.textContent = items.join('  ★  ');
    }

    function initQuotes() {
        var el = document.getElementById('quotes-track');
        var items = typeof cotacoes !== 'undefined' ? cotacoes : [];
        if (!el || !items.length) return;
        el.innerHTML = items.map(function(c) {
            return '<div class="q-item"><span class="material-icons">' + c.icone + '</span>' +
                '<span class="q-name">' + esc(c.nome) + '</span>' +
                '<span class="q-val">' + esc(c.valor) + '</span>' +
                '<span class="q-var ' + c.direcao + '">' + esc(c.variacao) + '</span></div>';
        }).join('');
    }

    function initTrending() {
        var el = document.getElementById('trending-pills');
        var items = typeof trending !== 'undefined' ? trending : [];
        if (!el || !items.length) { var s = document.getElementById('trending-section'); if(s) s.style.display='none'; return; }
        el.innerHTML = items.map(function(t) { return '<span class="t-pill">' + esc(t) + '</span>'; }).join('');
    }

    function initCards() { renderCards(); }
    function renderCards() {
        var el = document.getElementById('card-grid');
        if (!el) return;
        var filtered = curCat === 'todas' ? news : news.filter(function(n){return n.categoria===curCat});
        if (curTab === 'mais-lidas') filtered = filtered.slice().sort(function(){return 0.5-Math.random()});
        var show = filtered.slice(0, page * perPage);
        var cats = typeof CATEGORIAS !== 'undefined' ? CATEGORIAS : {};
        el.innerHTML = show.map(function(n) {
            var ci = cats[n.categoria] || {nome: n.categoria};
            return '<div class="card" data-id="' + n.id + '">' +
                '<div class="card-img"><img src="' + n.imagem + '" alt="" loading="lazy">' +
                '<span class="card-badge">' + esc(ci.nome||n.categoria) + '</span>' +
                '<button class="card-share" data-title="' + esc(n.titulo) + '"><span class="material-icons">share</span></button></div>' +
                '<div class="card-body">' +
                '<div class="card-title">' + esc(n.titulo) + '</div>' +
                '<div class="card-excerpt">' + esc(n.resumo||'') + '</div>' +
                '<div class="card-meta"><span>' + esc(n.autor) + '</span><span>' + n.tempo + '</span></div>' +
                '</div></div>';
        }).join('');
        var lb = document.getElementById('load-more');
        if (lb) lb.style.display = show.length < filtered.length ? 'block' : 'none';
        el.querySelectorAll('.card').forEach(function(c) {
            c.addEventListener('click', function(e) {
                if (e.target.closest('.card-share')) return;
                window.location.href = 'noticia.html?id=' + this.getAttribute('data-id');
            });
        });
        el.querySelectorAll('.card-share').forEach(function(b) {
            b.addEventListener('click', function(e) { e.stopPropagation(); openShare(this.getAttribute('data-title')); });
        });
    }

    function initCatBlocks() {
        var categories = ['politica','economia','cidade','esportes','brasil','internacional'];
        var cats = typeof CATEGORIAS !== 'undefined' ? CATEGORIAS : {};
        var idsUsados = {};
        news.slice(0, perPage).forEach(function(n) { idsUsados[n.id] = true; });
        categories.forEach(function(cat) {
            var row = document.querySelector('.card-row[data-cat="' + cat + '"]');
            if (!row) return;
            var items = news.filter(function(n){return n.categoria===cat && !idsUsados[n.id]}).slice(0,4);
            if (!items.length) { var block = document.getElementById('block-' + cat); if(block) block.style.display='none'; return; }
            items.forEach(function(n) { idsUsados[n.id] = true; });
            row.innerHTML = items.map(function(n) {
                return '<div class="card-v" data-id="' + n.id + '">' +
                    '<div class="card-v-img"><img src="' + n.imagem + '" alt="" loading="lazy"></div>' +
                    '<div class="card-v-body"><div class="card-v-title">' + esc(n.titulo) + '</div>' +
                    '<div class="card-v-meta">' + esc(n.autor) + ' &bull; ' + n.tempo + '</div></div></div>';
            }).join('');
            row.querySelectorAll('.card-v').forEach(function(c) {
                c.addEventListener('click', function() {
                    window.location.href = 'noticia.html?id=' + this.getAttribute('data-id');
                });
            });
        });
    }

    function initVideos() {
        var row = document.getElementById('video-row');
        if (!row || !vids.length) return;
        row.innerHTML = vids.map(function(v) {
            return '<div class="vid-card" data-vid="' + v.videoId + '" data-title="' + esc(v.titulo) + '">' +
                '<img src="' + v.thumb + '" alt="" loading="lazy">' +
                '<div class="vid-play"><span class="material-icons">play_arrow</span></div>' +
                '<span class="vid-dur">' + v.duracao + '</span>' +
                '<div class="vid-title">' + esc(v.titulo) + '</div></div>';
        }).join('');
        row.querySelectorAll('.vid-card').forEach(function(c) {
            c.addEventListener('click', function() {
                var m = document.getElementById('vmodal'), f = document.getElementById('vmodal-frame'), t = document.getElementById('vmodal-title');
                if (m && f) { f.innerHTML = '<iframe src="https://www.youtube.com/embed/' + this.getAttribute('data-vid') + '?autoplay=1" allowfullscreen allow="autoplay"></iframe>'; if(t) t.textContent = this.getAttribute('data-title'); m.classList.add('open'); }
            });
        });
        document.addEventListener('click', function(e) {
            if (e.target.id === 'vmodal-x' || e.target.closest('#vmodal-x') || e.target.id === 'vmodal') {
                var m = document.getElementById('vmodal'), f = document.getElementById('vmodal-frame');
                if (m) m.classList.remove('open'); if (f) f.innerHTML = '';
            }
        });
    }

    function initSearch() {
        var btn = document.getElementById('btn-search-open'), modal = document.getElementById('search-modal');
        var close = document.getElementById('search-close'), input = document.getElementById('search-input'), results = document.getElementById('search-results');
        if (!btn || !modal) return;
        btn.addEventListener('click', function() { modal.classList.add('open'); setTimeout(function(){if(input)input.focus()},100); });
        if (close) close.addEventListener('click', function() { modal.classList.remove('open'); });
        modal.addEventListener('click', function(e) { if(e.target===modal) modal.classList.remove('open'); });
        if (input && results) input.addEventListener('input', function() {
            var q = this.value.toLowerCase().trim();
            if (q.length < 2) { results.innerHTML = ''; return; }
            var found = news.filter(function(n) { return n.titulo.toLowerCase().indexOf(q)!==-1 || (n.resumo&&n.resumo.toLowerCase().indexOf(q)!==-1); }).slice(0,6);
            results.innerHTML = found.map(function(n) {
                return '<div class="sr-item" data-id="' + n.id + '"><h4>' + esc(n.titulo) + '</h4><p>' + esc(n.autor) + ' &bull; ' + n.tempo + '</p></div>';
            }).join('') || '<div class="sr-item"><h4>Sem resultados</h4></div>';
            results.querySelectorAll('.sr-item[data-id]').forEach(function(it) {
                it.addEventListener('click', function() { modal.classList.remove('open'); window.location.href = 'noticia.html?id=' + this.getAttribute('data-id'); });
            });
        });
    }

    function initNav() {
        document.querySelectorAll('.nav-cat[data-category]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-cat').forEach(function(l){l.classList.remove('active')});
                this.classList.add('active'); curCat = this.getAttribute('data-category'); page = 1; renderCards();
                window.scrollTo({top:0,behavior:'smooth'});
                var navEl = document.getElementById('nav-cats'); if(navEl) navEl.classList.remove('open');
            });
        });
        document.querySelectorAll('.footer-col a[data-category]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                e.preventDefault(); curCat = this.getAttribute('data-category'); page = 1;
                document.querySelectorAll('.nav-cat').forEach(function(l){l.classList.remove('active')});
                var nl = document.querySelector('.nav-cat[data-category="'+curCat+'"]'); if(nl) nl.classList.add('active');
                renderCards(); window.scrollTo({top:0,behavior:'smooth'});
            });
        });
    }

    function initMobileNav() {
        var toggle = document.getElementById('nav-mobile-toggle'), nav = document.getElementById('nav-cats');
        if (toggle && nav) toggle.addEventListener('click', function() { nav.classList.toggle('open'); });
    }

    function initShare() {
        var ov = document.getElementById('share-overlay'), x = document.getElementById('share-x');
        if (x) x.addEventListener('click', function() { ov.classList.remove('open'); });
        if (ov) ov.addEventListener('click', function(e) { if(e.target===ov) ov.classList.remove('open'); });
        document.querySelectorAll('.share-item').forEach(function(b) {
            b.addEventListener('click', function() {
                var p = this.getAttribute('data-p'), t = ov.getAttribute('data-title')||'RJ NOTÍCIAS', u = location.href;
                if(p==='whatsapp') window.open('https://wa.me/?text='+encodeURIComponent(t+' - '+u));
                else if(p==='twitter') window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&url='+encodeURIComponent(u));
                else if(p==='facebook') window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(u));
                else if(p==='copy') navigator.clipboard.writeText(t+' - '+u).then(function(){toast('Link copiado!')});
                ov.classList.remove('open');
            });
        });
    }

    function openShare(title) {
        var ov = document.getElementById('share-overlay');
        if (ov) { ov.setAttribute('data-title', title); ov.classList.add('open'); }
    }

    function initLoadMore() {
        var btn = document.getElementById('load-more');
        if (btn) btn.addEventListener('click', function() { page++; renderCards(); });
    }

    function initTabs() {
        document.querySelectorAll('.stab').forEach(function(b) {
            b.addEventListener('click', function() {
                document.querySelectorAll('.stab').forEach(function(s){s.classList.remove('active')});
                this.classList.add('active'); curTab = this.getAttribute('data-tab'); page = 1; renderCards();
            });
        });
    }

    function initReadingBar() {
        var bar = document.getElementById('reading-bar');
        if (!bar) return;
        window.addEventListener('scroll', function() {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (h > 0 ? (window.pageYOffset / h) * 100 : 0) + '%';
        });
    }

    function toast(msg) {
        var box = document.getElementById('toast-box'); if (!box) return;
        var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; box.appendChild(t);
        setTimeout(function() { t.classList.add('out'); setTimeout(function(){t.remove()},300); }, 3000);
    }

    function esc(t) { if(!t) return ''; var d = document.createElement('div'); d.appendChild(document.createTextNode(t)); return d.innerHTML; }
})();
