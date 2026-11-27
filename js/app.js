(function () {
  'use strict';

  var LS_THEME = 'hebrew_theme_v1';
  var LS_LANG = 'hebrew_index_lang_v1';
  var root = document.documentElement;
  var themeBtn = document.getElementById('btn-theme');
  var flagBtns = Array.prototype.slice.call(document.querySelectorAll('.flag-btn'));

  var I18N = {
    ru: {
      appTitle: 'Иврит · Тренажёры',
      subtitle: 'Выбери, что тренировать',
      alphabetName: 'Алфавит',
      alphabetDesc: 'Имена букв, звуки, никуд и софитные формы',
      wordsName: '100 слов',
      wordsDesc: 'Обучение, словарь и проверка в обе стороны',
      pronounsName: 'Местоимения',
      pronounsDesc: 'Формы с предлогами, роли и фразы',
      newProjectName: 'Новый проект',
      newProjectDesc: 'Скоро здесь появится ссылка',
      footer: 'Локальные офлайн-тренажёры · прогресс хранится в браузере',
      themeDark: 'Тёмная тема',
      themeLight: 'Светлая тема'
    },
    en: {
      appTitle: 'Hebrew · Trainers',
      subtitle: 'Choose what to practice',
      alphabetName: 'Alphabet',
      alphabetDesc: 'Letter names, sounds, niqqud and final forms',
      wordsName: '100 words',
      wordsDesc: 'Learning, dictionary and two-way review',
      pronounsName: 'Pronouns',
      pronounsDesc: 'Prepositional forms, roles and phrases',
      newProjectName: 'New project',
      newProjectDesc: 'A link will appear here soon',
      footer: 'Local offline trainers · progress is stored in your browser',
      themeDark: 'Dark theme',
      themeLight: 'Light theme'
    }
  };

  function loadLang() {
    try {
      var v = localStorage.getItem(LS_LANG);
      if (v === 'en' || v === 'ru') return v;
    } catch (e) {}
    return 'ru';
  }

  var currentLang = loadLang();
  var currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  function t(key) {
    var dict = I18N[currentLang] || I18N.ru;
    return dict[key] !== undefined ? dict[key] : I18N.ru[key];
  }

  function updateFlags() {
    flagBtns.forEach(function (b) {
      var active = b.dataset.lang === currentLang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateThemeButton() {
    var dark = currentTheme === 'dark';
    themeBtn.textContent = dark ? '☀️' : '🌙';
    var label = t(dark ? 'themeLight' : 'themeDark');
    themeBtn.title = label;
    themeBtn.setAttribute('aria-label', label);
  }

  function applyLanguage() {
    root.lang = currentLang;
    document.title = t('appTitle');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });
    updateFlags();
    updateThemeButton();
  }

  function setLang(code) {
    if (code !== 'en' && code !== 'ru') return;
    if (code === currentLang) return;
    currentLang = code;
    try { localStorage.setItem(LS_LANG, code); } catch (e) {}
    applyLanguage();
  }

  function applyTheme(theme, persist) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', currentTheme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', currentTheme === 'dark' ? '#16120f' : '#f5ede0');
    if (persist) {
      try { localStorage.setItem(LS_THEME, currentTheme); } catch (e) {}
    }
    updateThemeButton();
  }

  themeBtn.addEventListener('click', function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  });

  flagBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  applyTheme(currentTheme, false);
  applyLanguage();
})();
