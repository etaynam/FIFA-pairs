let names = [];
let MakePairs = document.getElementById('MakePairs');

let groups = [];

// טעינת הנתונים מהקובץ JSON
fetch('groups.json')
    .then(response => response.json())
    .then(data => groups = data)
    .catch(error => console.error('Error loading groups:', error));




function addName() {
    let PlayersSection = document.getElementById('PlayersSection').style.display = 'flex';
    let nameInput = document.getElementById('nameInput');
    let name = nameInput.value;
    if (name) {
        names.push(name);
        nameInput.value = '';
        updateNameList();
    }
}

function updateNameList() {
    let list = document.getElementById('nameList');
    list.innerHTML = '';
    names.forEach((name, index) => {
        let li = document.createElement('li');
        li.textContent = name;

        // כפתור עריכה
        let editBtn = document.createElement('button');
        editBtn.innerHTML = `<span id ="EditPlayerIcon" class="material-symbols-outlined"> edit_square </span>`;
        editBtn.classList.add("editPlayerBtn");
        editBtn.onclick = function() {
            openPopup(index);
        };
        li.appendChild(editBtn);

        list.appendChild(li);
    });
}

function pairNames() {
    let pairs = [];
    let shuffledNames = [...names];
    shuffledNames.sort(() => 0.5 - Math.random());

    while (shuffledNames.length >= 2) {
        pairs.push([shuffledNames.pop(), shuffledNames.pop()]);
    }

    if (shuffledNames.length) {
        pairs.push([shuffledNames.pop(), 'מישהו מהמפסידים']);
    }

    updatePairsList(pairs);
}

function updatePairsList(pairs) {
    let list = document.getElementById('pairsList');
    list.innerHTML = '';
    pairs.forEach(pair => {
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        let group = groups[Math.floor(Math.random() * groups.length)];
        li.innerHTML = `${pair[0]} ו${pair[1]}<b>${group.groupName}</b> <img src='${group.groupSymbol}' class="teamLogo" alt='סמל' style='height: 50px; width: 50px;'>`;
        list.appendChild(li);
    });
}


function resetNames() {
    names = [];
    updateNameList();
    document.getElementById('pairsList').innerHTML = '';
    let PlayersSection = document.getElementById('PlayersSection').style.display = 'none';
}

let currentEditIndex = -1;

function openPopup(index) {
    currentEditIndex = index;
    document.getElementById('editNameInput').value = names[index];
    document.getElementById('editPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('editPopup').style.display = 'none';
}

function confirmEdit() {
    let editedName = document.getElementById('editNameInput').value;
    if (editedName && currentEditIndex !== -1) {
        names[currentEditIndex] = editedName;
        updateNameList();
    }
    closePopup();
}


