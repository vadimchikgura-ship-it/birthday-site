// Находим кнопку на первом экране
const startButton = document.querySelector("#startButton");

// Находим раздел с нашей историей
const storySection = document.querySelector("#story");

// Следим за нажатием на кнопку
startButton.addEventListener("click", function () {

    // Плавно прокручиваем страницу к истории
    storySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// Секретные элементы
const secretHeart = document.querySelector("#secretHeart");
const secretModal = document.querySelector("#secretModal");
const closeSecret = document.querySelector("#closeSecret");

const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");

const secretTitle = document.querySelector(".secret-modal__title");
const secretAnswer = document.querySelector("#secretAnswer");

// Открываем секрет по нажатию на жёлтое сердце
secretHeart.addEventListener("click", function () {
    secretModal.classList.add("is-open");
    secretModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
});

// Закрываем секретное окно
function closeSecretModal() {
    secretModal.classList.remove("is-open");
    secretModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// Закрытие через крестик
closeSecret.addEventListener("click", closeSecretModal);

// Закрытие при нажатии на затемнённый фон
secretModal.addEventListener("click", function (event) {
    if (event.target === secretModal) {
        closeSecretModal();
    }
});

// Закрытие клавишей Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeSecretModal();
    }
});

// Функция побега кнопки «Нет»
function moveNoButton() {
    const buttonsArea = document.querySelector(
        ".secret-modal__buttons"
    );

    const areaWidth = buttonsArea.clientWidth;
    const areaHeight = buttonsArea.clientHeight;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Кнопка двигается только в правой половине
    const rightHalfStart = areaWidth / 2 + 10;

    const maximumX = areaWidth - buttonWidth;
    const maximumY = areaHeight - buttonHeight;

    const randomX =
        rightHalfStart +
        Math.random() * (maximumX - rightHalfStart);

    const randomY =
        Math.random() * maximumY;

    noButton.style.right = "auto";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transform = "none";
}

// Убегает при наведении мышки
noButton.addEventListener("pointerenter", moveNoButton);

// Убегает при попытке нажать на телефоне
noButton.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    moveNoButton();
});

// Не позволяем случайно нажать «Нет»
noButton.addEventListener("click", function (event) {
    event.preventDefault();
    moveNoButton();
});

// Ответ после нажатия «Да»
yesButton.addEventListener("click", function () {
    secretTitle.textContent = "Я так и знал! 💗";

    secretAnswer.style.display = "block";
    yesButton.style.display = "none";
    noButton.style.display = "none";
});

// Получаем все обычные и секретные сердечки
const floatingHearts = document.querySelectorAll(
    ".floating-hearts span, .floating-hearts .secret-heart"
);

// Случайное число между минимальным и максимальным
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Создаём новую случайную траекторию
function randomizeHeart(heart) {
    const startPosition = randomNumber(5, 95);
    const heartSize = randomNumber(22, 45);
    const duration = randomNumber(7, 12);

    const x1 = randomNumber(-60, 60);
    const x2 = randomNumber(-90, 90);
    const x3 = randomNumber(-70, 70);
    const x4 = randomNumber(-100, 100);

    heart.style.setProperty(
        "--position",
        `${startPosition}%`
    );

    heart.style.setProperty(
        "--heart-size",
        `${heartSize}px`
    );

    heart.style.setProperty(
        "--heart-duration",
        `${duration}s`
    );

    heart.style.setProperty("--heart-x1", `${x1}px`);
    heart.style.setProperty("--heart-x2", `${x2}px`);
    heart.style.setProperty("--heart-x3", `${x3}px`);
    heart.style.setProperty("--heart-x4", `${x4}px`);
}

// Задаём случайные траектории при загрузке
floatingHearts.forEach(function (heart) {
    randomizeHeart(heart);

    // После каждого пролёта создаём новую траекторию
    heart.addEventListener(
        "animationiteration",
        function () {
            randomizeHeart(heart);
        }
    );
});

const celebrationButton = document.querySelector(
    "#celebrationButton"
);

const confettiColors = [
    "#ff6fa9",
    "#ffd84d",
    "#9d75ec",
    "#76d8ff",
    "#7be0ae",
    "#ffffff"
];

celebrationButton.addEventListener("click", function () {

    // Создаём 140 элементов конфетти
    for (let i = 0; i < 140; i++) {
        const confetti = document.createElement("span");

        confetti.classList.add("confetti-piece");

        const color =
            confettiColors[
                Math.floor(Math.random() * confettiColors.length)
            ];

        confetti.style.setProperty(
            "--confetti-left",
            `${Math.random() * 100}vw`
        );

        confetti.style.setProperty(
            "--confetti-size",
            `${Math.random() * 10 + 7}px`
        );

        confetti.style.setProperty(
            "--confetti-color",
            color
        );

        confetti.style.setProperty(
            "--confetti-duration",
            `${Math.random() * 2 + 3}s`
        );

        confetti.style.setProperty(
            "--confetti-delay",
            `${Math.random() * 0.8}s`
        );

        confetti.style.setProperty(
            "--confetti-drift",
            `${Math.random() * 200 - 100}px`
        );

        confetti.style.setProperty(
            "--confetti-radius",
            Math.random() > 0.5 ? "50%" : "0"
        );

        document.body.appendChild(confetti);

        // Удаляем конфетти после падения
        setTimeout(function () {
            confetti.remove();
        }, 6000);
    }

    celebrationButton.textContent = "С днём рождения, Киця! 💗";

    setTimeout(function () {
        celebrationButton.textContent =
            "Запустить праздничный салют 🎉";
    }, 3500);
});

// Элементы подарка
const giftButton = document.querySelector("#giftButton");
const giftModal = document.querySelector("#giftModal");
const closeGiftModalButton = document.querySelector(
    "#closeGiftModal"
);

// После салюта показываем кнопку подарка
celebrationButton.addEventListener("click", function () {
    setTimeout(function () {
        giftButton.hidden = false;
    }, 1200);
});

// Отправляем уведомление через Flask
giftButton.addEventListener("click", async function () {
    giftButton.disabled = true;
    giftButton.textContent = "Отправляем... 🎁";

    try {
        const response = await fetch("/api/gift", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Telegram notification failed");
        }

        giftButton.hidden = true;

        giftModal.classList.add("is-open");
        giftModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    } catch (error) {
        giftButton.disabled = false;
        giftButton.textContent = "Попробовать ещё раз 🎁";

        alert(
            "Не получилось отправить сообщение. Попробуй ещё раз."
        );
    }
});

// Закрываем окно
function closeGiftModal() {
    giftModal.classList.remove("is-open");
    giftModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

closeGiftModalButton.addEventListener(
    "click",
    closeGiftModal
);

giftModal.addEventListener("click", function (event) {
    if (event.target === giftModal) {
        closeGiftModal();
    }
});