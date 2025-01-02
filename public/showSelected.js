let checkBoxesId = [
    "offsideNotatka",
    "offsideSprawdzian",
    "offsidePracaDomowa",
    "offsideKartkowka",
    "offsidePrezentacja",
    "offsideInne"
];

$(document).ready(function () {
    checkBoxesId.forEach(element => {
        document.getElementById(element).checked = true;
    });

    $("#offsideSelectSubject").change(function () {
        const selectedSubject = $(this).val();
        console.log("Selected subject:", selectedSubject);        
        DisplayOnlySelected(selectedSubject);
    });
    $("#offsideSelectSorting").change(function () {
        const selectedSort = $(this).val();
        console.log("Selected subject:", selectedSort);        
        DisplayOnlySelected($("#offsideSelectSubject").val());
    });

    checkBoxesId.forEach(checkBox => {
        const box = $(`#${checkBox}`);
        box.change(function () {
            console.log("Selected Type:", checkBox);
            DisplayOnlySelected($("#offsideSelectSubject").val());
        });
    });

    DisplayOnlySelected($("#offsideSelectSubject").val());
});

function DisplayOnlySelected(subject) {
    let selectedTypes = [];
    checkBoxesId.forEach(checkBox => {
        const checkbox = document.getElementById(checkBox);
        if (checkbox.checked) {
            selectedTypes.push(checkBox.replace(/^offside/, '').toLowerCase()); 
        }
    });

    $(".block").each(function () { 
        const element = $(this);
        const blockType = element.data("type");
        const blockSubject = element.data("subject");
        const sortType = element.data("sorttype");

        if (subject === "Wszystkie") {
            if (selectedTypes.includes(blockType) && sortType == $("#offsideSelectSorting").val()) {
                element.show();
            } else {
                element.hide();
            }
        } else {
            if (blockSubject === subject && selectedTypes.includes(blockType) && sortType == $("#offsideSelectSorting").val()) {
                element.show(); 
            } else {
                element.hide(); 
            }
        }
    });
}

