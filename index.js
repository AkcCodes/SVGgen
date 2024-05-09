const inquirer = require('inquirer@8.2.4')
const fs = require('fs')


inquirer 
.prompt[{
    type: 'input',
    message: 'Enter up to (3) characters:',
    name: 'characters',
},
{
    type: 'list',
    message: 'Choose a Shape:',
    name: 'shape',
    choices: ['triangle', 'square', 'circle'],
},
{
    type: 'input',
    message: 'Enter a color (OR hexdecimal number):',
    name: 'color',
}]
.then(
    fs.writeFile('logo.svg', )
)