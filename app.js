import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCJpwKn9VaRLvKFk2bQiy62a58m_MNrLbM",
    authDomain: "collage-865e9.firebaseapp.com",
    databaseURL: "https://collage-865e9-default-rtdb.firebaseio.com",
    projectId: "collage-865e9",
    storageBucket: "collage-865e9.appspot.com",
    messagingSenderId: "352289967594",
    appId: "1:352289967594:web:0d697b16dab912c8c13693",
    measurementId: "G-L4JC4BLB9L"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const contestList = document.getElementById("contestList");

// Функция загрузки данных
function loadContests() {
    onValue(ref(database, "contests"), (snapshot) => {
        contestList.innerHTML = "";
        snapshot.forEach(contestSnapshot => {
            const contestName = contestSnapshot.key;
            const div = document.createElement("div");
            div.innerHTML = `<h2>${contestName}</h2>`;
            
            contestSnapshot.forEach(participantSnapshot => {
                const participant = participantSnapshot.val();
                const participantKey = participantSnapshot.key; // Уникальный ключ участника
                div.innerHTML += `
                    <p>${participant.name} (${participant.group}) 
                        <button class="delete-btn" 
                            data-contest="${contestName}" 
                            data-participant-key="${participantKey}">
                            Удалить
                        </button>
                    </p>`;
            });

            contestList.appendChild(div);
        });
    });
}

// Функция удаления участника
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const contest = event.target.dataset.contest;
        const participantKey = event.target.dataset.participantKey;

        const userRef = ref(database, `contests/${contest}/${participantKey}`);
        remove(userRef)
            .then(() => {
                console.log(`Участник ${participantKey} из ${contest} удален`);
                setTimeout(() => {
                    window.location.replace("konk.html"); // Перенаправление через 0.5 секунды
                }, 500);
            })
            .catch((error) => {
                console.error("Ошибка удаления:", error);
            });
    }
});

// Функция добавления участника
document.getElementById("addParticipantBtn")?.addEventListener("click", () => {
    const contestName = document.getElementById("contestName").value.trim();
    const name = document.getElementById("nameInput").value.trim();
    const group = document.getElementById("groupInput").value.trim();

    if (!contestName || !name || !group) {
        alert("Заполните все поля!");
        return;
    }

    const contestRef = ref(database, `contests/${contestName}`);
    const newParticipantRef = push(contestRef); // Создает уникальный ключ

    set(newParticipantRef, { name, group })
        .then(() => {
            console.log("Участник добавлен");
            document.getElementById("nameInput").value = "";
            document.getElementById("groupInput").value = "";
            setTimeout(() => {
                window.location.replace("konk.html"); // Перенаправление через 0.5 секунды
            }, 500);
        })
        .catch((error) => {
            console.error("Ошибка добавления:", error);
        });
});

// Загрузка списка конкурсов при запуске
loadContests();
