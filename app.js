
/*
    Lane9 Main Application
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log("Lane9 loaded");


        if(window.StorageManager){

            StorageManager.load();

        }


        UI?.render();


        Charts?.initialize();


        setupButtons();

    }
);



function setupButtons(){

    const theme =
        document.getElementById("themeToggle");


    theme.onclick = () => {

        document.body.classList.toggle("light");

    };


    document
    .getElementById("importButton")
    .onclick = () => {

        UI.openImport();

    };


    document
    .getElementById("addSwimButton")
    .onclick = () => {

        UI.openAddSwim();

    };


    document
    .getElementById("newGoal")
    .onclick = () => {

        UI.openGoal();

    };

}
