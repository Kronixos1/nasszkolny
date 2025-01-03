$(document).ready(function () {
    $(".block").each(function (index, element) {
        $(element).on("click", function () {
            Expand(element);
        });
    });


    $("#blockExpandedClose").on("click", function () {
        $("#expandedBlockContainer").hide();
    });

    
    $("#confirmDialog").hide();
    //$("#expandedBlockContainer").hide();
    // --CHANGE DIS LATER--
});

function Expand(el) {
    let a = $(el).data("label") +
        " " + $(el).data("files") +
        " " + $(el).data("type") +
        " " + $(el).data("subject") +
        " " + $(el).data("id") +
        " " + $(el).data("uploaddate") +
        " " + $(el).data("content") +
        " " + $(el).data("datedue");

    $("#expandedBlockContainer").show();



    $("#blockExpandedContent").html($(el).data("content"));
    $("#blockExpandedLabel").html($(el).data("label"));
    $("#blockExpandedDateDue").html(`
        Data Sprawdzenia: ${$(el).data("datedue")}    
    `);
    $("#blockExpandedDateUpload").html(`
        Data Uploadu: ${$(el).data("uploaddate")}    
    `);

    if ($(el).data("files") != null) {
        //Wylew mózgu tutaj zaszedł. Z jakiegoś powodu jak sprawdzam .length w pier
        //-wszym ifie to mi zwraca true i kurwa nie wiem o chuj chodzi więc
        //aktualnie są zagnieżdzone ify w sobie xDDDD
        if ($(el).data("files").length != 0) {
            if (hasImageExtension($(el).data("files"))) {
                $("#blockExpandedFiles").html(
                    `
                    <img src="${$(el).data("files")}" alt="${$(el).data("files")}"></img>
                    <a href="${$(el).data("files")}" target="_blank" rel="noopener noreferrer">Pobierz</a>
                    `
                );
            } else {
                $("#blockExpandedFiles").html(
                    `
                    Plik: ${$(el).data("files")}
                    <a href="${$(el).data("files")}" target="_blank" rel="noopener noreferrer">Pobierz</a>
                    `
                );
            }
            
        } else {
            $("#blockExpandedFiles").html(
                `
                    Brak plików.
                `
            );    
        }

    } else {
        $("#blockExpandedFiles").html(
            `
                Brak plików.
            `
        ); 
    }
    
    $("#blockExpandedCopy").html(`
        <button onclick="copyToClipboard(${$(el).data("content")})">Skopiuj</button>
    `);

    $("#blockExpandedRemove").html(`
        <button onclick="showConfirmDialog(${$(el).data("id")}, '${$(el).data("label")}')">Usuń wpis</button>    
    `);
}


function hasImageExtension(fileName) {
    const lowerCaseFileName = fileName.toLowerCase();
    return (
        lowerCaseFileName.endsWith(".png") ||
        lowerCaseFileName.endsWith(".jpg") ||
        lowerCaseFileName.endsWith(".jpeg") ||
        lowerCaseFileName.endsWith(".gif") ||
        lowerCaseFileName.endsWith(".webp")
    );
}

function showConfirmDialog(id, label) {
    $("#confirmDialog").html(`
        <h5>Czy na pewno chcesz usunąć wpis: ${label}?</h5>
        Ta operacja jest nieodrwacalna i celowe usuwnie wpisów będzie karane
        <button onclick="removeObjectById(${id})" style="position: absolute; left: 5%; bottom: 1%;">Usuń</button>
        <button onclick="hideConfirmDialog()" style="position: absolute; right: 5%; bottom: 1%;">Cofnij</button>
        `);
    $("#confirmDialog").show();
}

function hideConfirmDialog() {
    $("#confirmDialog").hide();
}

function copyToClipboard(str) {
    try {
        navigator.clipboard.writeText(str);
    } catch (err) {
        console.error("Error copying text: ", err);
    }
}