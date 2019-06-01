/**
 * Main js
 */

var $ = require("jquery");

var http = require('http'),
    fs = require('fs');

const express = require('express');
const app = express();
const port = 8000;

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const sPort = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = sPort.pipe(new Readline({ delimiter: '\n' }));

var path = require('path');


var slots = {
    0: {
        percent: 50,
        html: '<img src="public/imgs/icons/0.png" />',
        rate: 0
    },
    1: {
        percent: 25,
        html: '<img src="public/imgs/icons/1.png" />',
        rate: 1
    },
    2: {
        percent: 13,
        html: '<img src="public/imgs/icons/2.png" />',
        rate: 1.5
    },
    3: {
        percent: 6,
        html: '<img src="public/imgs/icons/3.png" />',
        rate: 2
    },
    4: {
        percent: 3,
        html: '<img src="public/imgs/icons/4.png" />',
        rate: 2.5
    },
    5: {
        percent: 2,
        html: '<img src="public/imgs/icons/5.png" />',
        rate: 3
    },
    6: {
        percent: 1,
        html: '<img src="public/imgs/icons/6.png" />',
        rate: 10
    }
};

// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/templates/index.html'));
});


app.get('/slots', function (req, res) {

    var htmlArray = [[], [], []];
    var h = 0;

    for (slotObj in slots) {
        var slot = slots[slotObj];
        console.log(slot.percent);
        for (i = 0; i < slot.percent; i++) {
            htmlArray[0].push('<div class="slot" id="slot1-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
            htmlArray[1].push('<div class="slot" id="slot2-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
            htmlArray[2].push('<div class="slot" id="slot3-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
            h++;
        }
    };


    var arra = [shuffle(htmlArray[0]), shuffle(htmlArray[1]), shuffle(htmlArray[2])]


    res.json({ slots: arra })
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


sPort.on("open", () => {
    console.log('serial port open');
});
parser.on('data', data => {
    console.log('got word from arduino:', data);
});