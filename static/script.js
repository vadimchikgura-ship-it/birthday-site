// Находим кнопку на первом экране
const startButton = document.querySelector("#startButton");

// Находим модальное окно со сториями
const storyModal = document.querySelector("#storyModal");
const closeStoryModal = document.querySelector("#closeStoryModal");
const storyCards = document.querySelectorAll(".story-card--modal");

// При нажатии на кнопку "Открыть мой подарок" открываем модальное окно
startButton.addEventListener("click", function () {
    storyModal.classList.add("is-open");
    storyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
});

// Закрываем модальное окно
function closeStory() {
    storyModal.classList.remove("is-open");
    storyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    
    // Сбрасываем все карточки при закрытии
    storyCards.forEach(card => {
        card.classList.remove("is-open");
        const preview = card.querySelector(".story-card__preview");
        const full = card.querySelector(".story-card__full");
        preview.hidden = false;
        full.hidden = true;
    });
}

// Закрытие через кнопку
closeStoryModal.addEventListener("click", closeStory);

// Закрытие при нажатии на фон
storyModal.addEventListener("click", function (event) {
    if (event.target === storyModal) {
        closeStory();
    }
});

// Закрытие клавишей Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !storyModal.getAttribute("aria-hidden")) {
        closeStory();
    }
});

// При клике на карточку показываем полный текст
storyCards.forEach(card => {
    card.addEventListener("click", function () {
        card.classList.toggle("is-open");
        
        const preview = card.querySelector(".story-card__preview");
        const full = card.querySelector(".story-card__full");
        
        if (card.classList.contains("is-open")) {
            preview.hidden = true;
            full.hidden = false;
        } else {
            preview.hidden = false;
            full.hidden = true;
        }
    });
});



// Управление галереей слайдер с бесконечным циклом
const galleryPhotos = document.querySelector("#galleryPhotos");

const photoCard = document.querySelector(".photo-card");
const photoWidth = photoCard?.offsetWidth || 320;
const gap = 25;
const cardWithGap = photoWidth + gap;
const totalCards = document.querySelectorAll(".photo-card").length;
const halfCycle = (totalCards / 2) * cardWithGap;

// Автоматическая прокрутка слева направо
let autoScrollSpeed = 2; // пиксели в мс (увеличено с 1 на 2)
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(function () {
        galleryPhotos.scrollLeft += autoScrollSpeed;
        
        // Когда доходим до половины цикла, прыгаем в начало второго набора
        if (galleryPhotos.scrollLeft >= halfCycle - 10) {
            galleryPhotos.scrollLeft = 0;
        }
    }, 30);
}

// Останавливаем автоскролл при наведении
galleryPhotos?.addEventListener("mouseenter", function () {
    clearInterval(autoScrollInterval);
});

// Возобновляем автоскролл когда мышь уходит
galleryPhotos?.addEventListener("mouseleave", function () {
    startAutoScroll();
});

// Начинаем автоскролл при загрузке страницы
startAutoScroll();

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
    secretTitle.textContent = "Я так і знав! 💗";

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
    "#7d0f2f",
    "#b8965d",
    "#5f426f",
    "#8e8396",
    "#d8c7aa",
    "#f1e8dc"
];

celebrationButton?.addEventListener("click", function () {

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

    celebrationButton.textContent = "З днем народження, Кицю! 💗";

    setTimeout(function () {
        celebrationButton.textContent =
            "Запустити святковий салют 🎉";
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
    giftButton.textContent = "Надсилаємо... 🎁";

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
        giftButton.textContent = "Спробувати ще раз 🎁";

        alert(
            "Не вдалося надіслати повідомлення. Спробуй ще раз."
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
