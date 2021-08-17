const fetch = require('node-fetch');
const prompt = require('prompt');
const querystring = require('querystring');

var correctquestions = 0;
var questionno = 1;

// Set to 0 for nothing
const category = 9;
const questiontype = 'boolean';
const noquestions = 10;
const difficulty = 0;

async function trivia(results) {
	const question = results[questionno - 1];
	console.log(`Question ${questionno}/${noquestions}\n\nCategory: ${querystring.unescape(question.category)}\nDifficulty: ${question.difficulty}\n\n${querystring.unescape(question.question)}`);
	const {answer} = await prompt.get(['answer']);
	console.log(`The answer was ${question.correct_answer}.`);
	if (answer.toLowerCase() == question.correct_answer.toLowerCase()) {
		console.log('Congratulations!\n');
        correctquestions = correctquestions + 1
	} else if (answer.toLowerCase() == 'exit') {
		questionno = noquestions;
	} else {
        console.log('Better luck next time!\n');
    }
	if (questionno == noquestions) {
        console.log('Finished game!');
        console.log(`Scored ${correctquestions}/${noquestions}`)
    } else {
        questionno = questionno + 1;
        trivia(results);
    }
}

async function init() {
    var diff = `&difficulty=${difficulty}`;
    var questype = `&type=${questiontype}`;
    var cat = `&category=${category}`;
    
    if (difficulty == 0) {
        diff = '';
    }
    if (questiontype == 0) {
        questype = '';
    }
    if (category == 0) {
        cat = '';
    }
    const niceurl = `https://opentdb.com/api.php?amount=${noquestions}&encode=url3986${cat}${questype}${diff}`;
    const { results } = await fetch(niceurl.replace(/\ /g, '')).then(response => response.json());
    trivia(results);
}

init();
