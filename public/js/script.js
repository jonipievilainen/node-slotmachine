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

var winLines = Array();

$.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        $(this[i]).before($(this[j]));
    }
    return this;
};

var h = 0;
$.each(slots, function (index, slot) { // TODO : Remove 
    for (i = 0; i < slot.percent; i++) {
        $("#slot1").append('<div class="slot" id="slot1-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
        $("#slot2").append('<div class="slot" id="slot2-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
        $("#slot3").append('<div class="slot" id="slot3-' + h + '" data-percent="' + slot.percent + '">' + slot.html + '<div>');
        h++;
    }
});


$.get("http://localhost:8000/slots", function (data) { // TODO : Need to get this work
    for (i = 0; i < 100; i++) {
        var slot0 = data.slots[0][i];
        var slot1 = data.slots[1][i];
        var slot2 = data.slots[2][i];
    }

});

// socket control

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log(socket.connected); // true
});

socket.on('chat message', function (msg) {
    if (msg == 1) {
        $('#randomizeButton').trigger('click');
    }
});



const allEqual = arr => arr.every(v => v === arr[0]);
var currentSlots = [{ lock: true }, { lock: true }, { lock: true }];

const btn = document.querySelector('#randomizeButton');
const results = {
    machine1: document.querySelector('#slot1'),
    machine2: document.querySelector('#slot2'),
    machine3: document.querySelector('#slot3')
};
const el1 = document.querySelector('#slot1');
const el2 = document.querySelector('#slot2');
const el3 = document.querySelector('#slot3');
const machine1 = new SlotMachine(el1, {
    active: 0,

});
const machine2 = new SlotMachine(el2, {
    active: 0,

});
const machine3 = new SlotMachine(el3, {
    active: 0,

});

function onComplete(active) {
    let percent1 = $(machine1.tiles[machine1.active]).attr('data-percent');
    let percent2 = $(machine2.tiles[machine2.active]).attr('data-percent');
    let percent3 = $(machine3.tiles[machine2.active]).attr('data-percent');

    if (percent1 === percent2 && percent1 === percent3) {
        console.log("winner!!!");
        displayWinLine(1);
        socket.emit('chat message', "win");
    } else {
        console.log('no win rip');
        socket.emit('chat message', "lose");
    }

}

btn.addEventListener('click', () => {

    hideWinLine(1);

    //if(!currentSlots[0].lock)
    machine1.shuffle(1);
    // if(!currentSlots[1].lock)
    setTimeout(() => machine2.shuffle(1), 200);
    //if(!currentSlots[2].lock)
    setTimeout(() => machine3.shuffle(1, onComplete), 400);
});

/**
 * Lock slot
 */
$('.lockBtn').on('click', function () {
    console.log(this.id);

    if (this.id === "lock-1") {
        currentSlots[0].lock = true;
    }

    if (this.id === "lock-2") {
        currentSlots[1].lock = true;
    }

    if (this.id === "lock-3") {
        currentSlots[2].lock = true;
    }

});


function displayWinLine(id) {
    winLines[id] = setInterval(function () {

        if ($('#line-' + id).is(':hidden')) {
            $('#line-' + id).show();
        } else {
            $('#line-' + id).hide();
        }

    }, 500);
}

function hideWinLine(id) {
    clearInterval(winLines[id]);
    $('#line-' + id).hide();
}