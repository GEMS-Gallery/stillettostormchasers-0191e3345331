import { backend } from 'declarations/backend';

let hunters = [];
let missions = [];

async function init() {
    await loadHunters();
    await loadMissions();
    setupEventListeners();
}

async function loadHunters() {
    hunters = await backend.getAllHunters();
    displayHunters();
    updateHunterSelect();
}

async function loadMissions() {
    missions = await backend.getAllMissions();
    displayMissions();
}

function displayHunters() {
    const huntersList = document.getElementById('hunters');
    huntersList.innerHTML = '';
    hunters.forEach(hunter => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = hunter.imageUrl;
        img.alt = `${hunter.name} in heels`;
        li.appendChild(img);
        const info = document.createElement('span');
        info.textContent = `${hunter.name} (Heel Height: ${hunter.heelHeight} inches)`;
        li.appendChild(info);
        huntersList.appendChild(li);
    });
}

function displayMissions() {
    const missionsList = document.getElementById('missions');
    missionsList.innerHTML = '';
    missions.forEach(mission => {
        const hunter = hunters.find(h => h.id === mission.hunterID);
        const li = document.createElement('li');
        if (hunter) {
            const img = document.createElement('img');
            img.src = hunter.imageUrl;
            img.alt = `${hunter.name} in heels`;
            li.appendChild(img);
        }
        const info = document.createElement('span');
        info.textContent = `${hunter ? hunter.name : 'Unknown Hunter'} - Hurricane ${mission.hurricaneName} (${mission.date})`;
        li.appendChild(info);
        missionsList.appendChild(li);
    });
}

function updateHunterSelect() {
    const hunterSelect = document.getElementById('hunter-select');
    hunterSelect.innerHTML = '<option value="">Select Hunter</option>';
    hunters.forEach(hunter => {
        const option = document.createElement('option');
        option.value = hunter.id;
        option.textContent = hunter.name;
        hunterSelect.appendChild(option);
    });
}

function setupEventListeners() {
    document.getElementById('hunter-form').addEventListener('submit', addHunter);
    document.getElementById('mission-form').addEventListener('submit', addMission);
}

async function addHunter(event) {
    event.preventDefault();
    const name = document.getElementById('hunter-name').value;
    const heelHeight = parseInt(document.getElementById('heel-height').value);
    await backend.addHunter(name, heelHeight);
    await loadHunters();
    event.target.reset();
}

async function addMission(event) {
    event.preventDefault();
    const hunterID = parseInt(document.getElementById('hunter-select').value);
    const hurricaneName = document.getElementById('hurricane-name').value;
    const date = document.getElementById('mission-date').value;
    await backend.addMission(hunterID, hurricaneName, date);
    await loadMissions();
    event.target.reset();
}

init();
