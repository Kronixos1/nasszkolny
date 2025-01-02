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
    $("#expandedBlockContainer").hide();
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
    }

    $("#blockExpandedRemove").html(`
        <button onclick="showConfirmDialog(${$(el).data("id")}, ${$(el).data("label")})">Usuń wpis</button>    
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
        Ta operacja jest nieodrwacalna i celowe usuwnie wpisów będzie karalne
        <button onclick="removeObjectById(${id})" style="position: absolute; left: 5%; bottom: 1%;">Usuń</button>
        <button onclick="hideConfirmDialog()" style="position: absolute; right: 5%; bottom: 1%;">Cofnij</button>
        `);
        $("#confirmDialog").show();
}

function hideConfirmDialog() {
    $("#confirmDialog").hide();
}