let stompClient = null;

function connect() {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = new window.StompJs.Client({
    webSocketFactory: () => socket,
    debug: function (str) { /* console.log(str); */ }
  });

  stompClient.onConnect = (frame) => {
    stompClient.subscribe('/topic/themes', (message) => {
      const themes = JSON.parse(message.body);
      renderThemes(themes);
    });

    stompClient.subscribe('/topic/responses', (message) => {
      const responses = JSON.parse(message.body);
      renderResponses(responses);
    });
  };

  stompClient.onStompError = (frame) => {
    alert('エラーが発生しました: ' + frame.headers['message']);
  };

  stompClient.activate();
}

function showLoading() {
  document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// テーマ選択時やお題生成時にローディング表示
function requestThemes() {
  if (stompClient && stompClient.connected) {
    showLoading();
    stompClient.publish({
      destination: '/app/request-themes',
      body: ''
    });
  }
}

function submitTheme(theme) {
  if (stompClient && stompClient.connected) {
    showLoading();
    stompClient.publish({
      destination: '/app/submit-theme',
      body: theme
    });
  }
}

function renderThemes(themes) {
  hideLoading();
  const container = document.getElementById('themes');
  container.innerHTML = '';
  themes.forEach(theme => {
    const button = document.createElement('button');
    button.textContent = theme;
    button.className = 'theme-btn';
    button.onclick = () => submitTheme(theme.replace(/^\d+\.\s*/, ''));
    container.appendChild(button);
  });
}

function renderResponses(responses) {
  hideLoading();
  const container = document.getElementById('responses');
  container.innerHTML = '<h3>回答例</h3>';
  responses.forEach(res => {
    const div = document.createElement('div');
    div.textContent = res;
    div.className = 'response';
    container.appendChild(div);
  });
}

document.getElementById('submitCustomThemeBtn').onclick = () => {
  const input = document.getElementById('customThemeInput');
  const theme = input.value.trim();
  if (theme.length === 0) {
    input.focus();
    return;
  }
  submitTheme(theme);
  input.value = '';
};

document.getElementById('requestThemesBtn').onclick = requestThemes;

connect();
