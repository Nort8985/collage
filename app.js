// Подключение Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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

// Обработка формы регистрации
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const group = document.querySelector('input[name="group"]').value.trim();

    if (!name || !group) {
        alert("Заполни все поля!");
        return;
    }

    // Сохраняем пользователя под contests/{contestName}/{name}
    const contestName = "defaultContest"; // Replace with actual contest name if available
    console.log(`Saving participant: ${name}, Group: ${group} under contest: ${contestName}`);
    
    set(ref(database, `contests/${contestName}/${name}`), {
        name: name,
        group: group
    }).then(() => {
        console.log(`Participant ${name} saved successfully.`);
        window.location.href = "konk.html"; // Переход к конкурсам
    }).catch((error) => {
        console.error("Error saving participant:", error.message);
        alert("Ошибка: " + error.message);
    });
});
