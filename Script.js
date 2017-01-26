

var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

$('input[type=radio][name=shape]').on('change', function() {
    switch($(this).val()) {
        case 'Rectangle':
            console.log("Set shape to rectangle");
            setShape("Rectangle");
            break;
        case 'Pen':
            console.log("Set shape to Pen");
            setShape("Pen");
            break;
        case 'Circle':
            console.log("Set shape to Circle");
            setShape("Circle");
            break;
    }
});
