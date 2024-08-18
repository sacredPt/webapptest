// Инициализация переменных
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let perClick = parseFloat(localStorage.getItem('perClick')) || 1;
let autoClickers = parseFloat(localStorage.getItem('autoClickers')) || 0.00;
let upgradeCost = parseFloat(localStorage.getItem('upgradeCost')) || 1.00;
let autoClickerCost = parseFloat(localStorage.getItem('autoClickerCost')) || 5.00;

// Обновление отображения


function updateDisplay() {
    const balanceElement = document.getElementById('balance');
    const clickValueElement = document.getElementById('click-value');
    const autoMiningElement = document.getElementById('auto-mining');
    const upgradeOptionElement = document.getElementById('upgradeOption');
    const autoClickerOptionElement = document.getElementById('autoClickerOption');

    if (balanceElement) {
        balanceElement.innerText = `Balance: ${balance.toFixed(0)} $BABIZAN`;
    }

    let existingIcon = document.querySelector('.balance-icon');
    if (!existingIcon) {
        const icon = document.createElement('img');
        icon.src = 'logo2.webp';
        icon.alt = 'Icon';
        icon.className = 'balance-icon';
        balanceElement.appendChild(icon);
    }

    if (clickValueElement) {
        clickValueElement.innerText = `Per click: ${perClick.toFixed(0)} $BABIZAN`;
    }

    if (autoMiningElement) {
        autoMiningElement.innerText = `Auto Mining: ${autoClickers.toFixed(0)} $BABIZAN/sec`;
    }

    if (upgradeOptionElement) {
        upgradeOptionElement.innerText = `+1 per click - ${upgradeCost.toFixed(0)} coins`;
    }

    if (autoClickerOptionElement) {
        autoClickerOptionElement.innerText = `Auto Clicker - ${autoClickerCost.toFixed(0)} coins`;
    }

    saveGame();
}

// Клик по фото



function clickPhoto(event) {
    if (!event) {
        console.error('Event is not defined')
        return
    }

    balance += perClick;
    updateDisplay();

    const container = document.querySelector('.container');
    const clickInfoElement = document.createElement('div');
    clickInfoElement.className = 'click-info';
    clickInfoElement.innerText = `+${perClick.toFixed(0)} $BABIZAN`;

    const imgElement = document.getElementById('clickImage');
    const imgRect = imgElement.getBoundingClientRect();

    const x = event.clientX - imgRect.left - (clickInfoElement.offsetWidth / 2) + window.scrollX;
    const y = event.clientY - imgRect.top - (clickInfoElement.offsetHeight / 2) + window.scrollY;

    clickInfoElement.style.left = `${x}px`;
    clickInfoElement.style.top = `${y}px`;
    container.appendChild(clickInfoElement);

    requestAnimationFrame(() => {
        clickInfoElement.classList.add('show');
    });

    setTimeout(() => {
        clickInfoElement.classList.remove('show');
        setTimeout(() => {
            container.removeChild(clickInfoElement);
        }, 500);
    }, 1500);
}

// Сохранение игры в Local Storage
function saveGame() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('perClick', perClick);
    localStorage.setItem('autoClickers', autoClickers);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('autoClickerCost', autoClickerCost);
}

// Покупка улучшения
function buyUpgrade() {
    if (balance >= upgradeCost) {
        balance -= upgradeCost;
        perClick += 1;
        upgradeCost *= 3;
        updateDisplay();
    }
}

// Покупка авто-кликера
function buyAutoClicker() {
    if (balance >= autoClickerCost) {
        balance -= autoClickerCost;
        autoClickers += 1; // Добавляем 0.01 Ton в секунду за каждую покупку авто-кликера
        autoClickerCost *= 5;
        updateDisplay();
    }
}

// Запуск авто-кликеров
setInterval(() => {
    balance += autoClickers; // Увеличиваем баланс на количество Ton в секунду
    updateDisplay();
}, 1000);

// Сброс игры
function resetGame() {
    localStorage.clear();
    balance = 0.00;
    perClick = 1;
    autoClickers = 0.00;
    upgradeCost = 1.00;
    autoClickerCost = 1.00;
    updateDisplay();
}

// Инициализация интерфейса
updateDisplay();

// Добавляем обработчик клика для изображения
document.getElementById('clickImage').addEventListener('click', clickPhoto);

// Обработчики для кнопок улучшений и авто-кликеров
document.getElementById('upgradeOption').addEventListener('click', buyUpgrade);
document.getElementById('autoClickerOption').addEventListener('click', buyAutoClicker);