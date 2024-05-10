const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shapes');

class Svg {
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

const questions = [{
    type: 'input',
    message: 'Enter up to (3) characters:',
    name: 'text',
}, {
    type: "input",
    name: "text-color",
    message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
},
{
    type: 'list',
    message: 'Choose a Shape:',
    name: 'logo-shape',
    choices: ['Triangle', 'Square', 'Circle'],
},
{
    type: 'input',
    message: 'Enter a color (OR hexdecimal number) for your shape:',
    name: 'shape-color',
}];

function writeToFile(fileName, data){
    console.log('Writing to file!')
    fs.writeFile(fileName,data, function (err) {
        if (err) {
            console.log(err)
    }
    console.log('You have made a logo.svg!')
});
}

async function init(){
    console.log('Init running');
    var svgString="";
    var svg_file="logo.svg";

    const answers = await inquirer.prompt(questions);

    var user_text = "";
    if(answers.text.length > 0 && answers.text.length < 4){
        user_text = answers.text;
    }else{
        console.log('Please enter 1-3 characters into the field.');
        return;
    }
    user_font_color = answers["text-color"];
    user_shape_type = answers["logo-shape"];
    user_shape_color = answers["shape-color"]

    let user_shape;
    if(user_shape_type === "Square" || user_shape_type === "square"){
        user_shape = new Square()
    }else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("User selected Triangle shape");
	}else{
        console.log('Invalid Shape')
    }
    user_shape.setColor(user_shape_color)

    var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	console.log("Displaying shape:\n\n" + svgString);

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgString); 
}

init()