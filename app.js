document.addEventListener("DOMContentLoaded", () => {
    StorageManager.load();

    populateEvents();
    setupButtons();
    UI.render();
});

function populateEvents() {
    const selector = document.getElementById("eventSelector");
    if (!selector) return;

    const events = EventManager.getEvents();
    const current = EventManager.getCurrent();

    selector.innerHTML = events.map(event => `
        <option value="${event}" ${event === current ? "selected" : ""}>
            ${event}
        </option>
    `).join("");

    selector.onchange = () => {
        EventManager.setCurrent(selector.value);
        UI.render();
    };
}

function setupButtons() {
    document.getElementById("themeToggle").onclick = () => {
        document.body.classList.toggle("light");
    };

    document.getElementById("importButton").onclick = () => {
        UI.openImport();
    };

    document.getElementById("addSwimButton").onclick = () => {
        UI.openAddSwim();
    };

    document.getElementById("newGoal").onclick = () => {
        UI.openGoal();
    };

    document.getElementById("exportButton").onclick = () => {
        ImportExport.download();
    };

    document.getElementById("importBackupButton").onclick = () => {
        document.getElementById("backupInput").click();
    };

    document.getElementById("backupInput").onchange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const success = await ImportExport.upload(file);

        if (success) {
            populateEvents();
            UI.render();
            alert("Backup restored!");
        } else {
            alert("Invalid backup file.");
        }
    };
}
