import { el, All } from "./lib.js";
import Player from "../components/Player.js";
import PlayerBadge from "../components/PlayerBadge.js";
import EmptyPlayerBadge from "../components/EmptyPlayerBadge.js";
import AddForm from "../components/AddForm.js";
import Overlay from "../components/Overlay.js";
import EditForm from "../components/EditForm.js";

let players;
let selectedPlayers;

function updateLocalStoragePlayers() {
	localStorage.setItem("players", JSON.stringify(players));
}

fetch("/assets/data/data.json")
	.then((response) => response.json())
	.then((data) => {
		players = JSON.parse(localStorage.getItem("players")) || data.players;
		selectedPlayers = JSON.parse(localStorage.getItem("selected-players")) || players.slice(0, 11);
		displaySelectedPlayers(selectedPlayers);
		updateLocalStoragePlayers();
		updateLocalStorageSelectedPlayers();
		displayPlayersList(players);
		// search players feature
		el("#search").addEventListener("input", (e) => search(e.currentTarget.value, players));
	})
	.catch((error) => {
		console.error("Error:", error);
	});

function displayPlayersList(players) {
	el(".players-list").innerHTML = players.map((player) => Player(player)).join("");
}

function search(query, players) {
	const searchResult = players.filter((player) => {
		const name = player.name.toLowerCase();
		console.log(name);
		return name.includes(query.toLowerCase());
	});
	displayPlayersList(searchResult);
}

// open AddForm
el(".add-btn").addEventListener("click", openAddForm);
function openAddForm(event) {
	el("body").insertAdjacentHTML("beforeend", Overlay(AddForm()));
}

// get addForm Data as an object
function getFormData() {
	return {
		id: Date.now(),
		name: el("#name").value.trim(),
		photo: el("#photo").value.trim(),
		position: el("#position").value.trim(),
		nationality: el("#nationality").value.trim(),
		flag: el("#flag").value.trim(),
		club: el("#club").value.trim(),
		logo: el("#logo").value.trim(),
		rating: parseInt(el("#rating").value.trim()) || 0,
		pace: parseInt(el("#pace").value.trim()) || 0,
		shooting: parseInt(el("#shooting").value.trim()) || 0,
		passing: parseInt(el("#passing").value.trim()) || 0,
		dribbling: parseInt(el("#dribbling").value.trim()) || 0,
		defending: parseInt(el("#defending").value.trim()) || 0,
		physical: parseInt(el("#physical").value.trim()) || 0,
	};
}

// close Form
function closeForm() {
	el(".overlay").classList.replace("fade-in", "fade-out");
	el(".overlay").addEventListener("animationend", () => el(".overlay").remove());
}

// addPlayer
window.addPlayer = function (event) {
	event.preventDefault();
	if (!validateForm()) return;
	const newPlayer = getFormData();
	players.push(newPlayer);
	updateLocalStoragePlayers();
	displayPlayersList(players);
	closeForm();
};

// deletePlayer
window.deletePlayer = function (id) {
	players = players.filter((player) => player.id != id);
	displayPlayersList(players);
	updateLocalStoragePlayers();
	selectedPlayers = selectedPlayers.map((player) => (player.id == id ? "empty" : player));
	displaySelectedPlayers(selectedPlayers);
};
// open EditForm
window.openEditForm = function (id) {
	const player = players.find((player) => player.id == id);
	el("body").insertAdjacentHTML("beforeend", Overlay(EditForm(player)));
};

// editPlayer
window.editPlayer = function (event, id) {
	event.preventDefault();
	if (!validateForm()) return;
	const updatedPlayer = getFormData();
	const index = players.findIndex((player) => player.id == id);
	players[index] = {
		id: players[index].id,
		...updatedPlayer,
	};
	displayPlayersList(players);
	updateLocalStoragePlayers();
	closeForm();
};

// validate input
function validateForm() {
	const name = el("#name").value.trim();
	const photo = el("#photo").value.trim();
	const position = el("#position").value.trim();
	const nationality = el("#nationality").value.trim();
	const flag = el("#flag").value.trim();
	const club = el("#club").value.trim();
	const logo = el("#logo").value.trim();
	const rating = el("#rating").value.trim();
	const pace = el("#pace").value.trim();
	const shooting = el("#shooting").value.trim();
	const passing = el("#passing").value.trim();
	const dribbling = el("#dribbling").value.trim();
	const defending = el("#defending").value.trim();
	const physical = el("#physical").value.trim();

	let errorMessage;

	if (name === "") errorMessage = "Name is required.";
	else if (!isValidUrl(photo)) errorMessage = "Photo URL is invalid.";
	else if (position === "") errorMessage = "Position is required.";
	else if (nationality === "") errorMessage = "Nationality is required.";
	else if (!isValidUrl(flag)) errorMessage = "Flag URL is invalid.";
	else if (club === "") errorMessage = "Club is required.";
	else if (!isValidUrl(logo)) errorMessage = "Logo URL is invalid.";
	else if (!isValidNumber(rating, 0, 99)) errorMessage = "Rating must be a number between 0 and 99.";
	else if (!isValidNumber(pace, 0, 99)) errorMessage = "Pace must be a number between 0 and 99.";
	else if (!isValidNumber(shooting, 0, 99)) errorMessage = "Shooting must be a number between 0 and 99.";
	else if (!isValidNumber(passing, 0, 99)) errorMessage = "Passing must be a number between 0 and 99.";
	else if (!isValidNumber(dribbling, 0, 99)) errorMessage = "Dribbling must be a number between 0 and 99.";
	else if (!isValidNumber(defending, 0, 99)) errorMessage = "Defending must be a number between 0 and 99.";
	else if (!isValidNumber(physical, 0, 99)) errorMessage = "Physical must be a number between 0 and 99.";

	if (errorMessage) {
		alert(errorMessage);
		return false;
	}
	return true;
}

function isValidUrl(url) {
	const pattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
	return pattern.test(url);
}

function isValidNumber(value) {
	const num = parseInt(value);
	return !isNaN(num) && num >= 0 && num <= 99;
}

function displaySelectedPlayers(selectedPlayers) {
	el(".terrain").innerHTML = selectedPlayers
		.map((player, i) =>
			player == "empty" ? EmptyPlayerBadge(`position-${i + 1}`, i) : PlayerBadge(player, `position-${i + 1}`, i)
		)
		.join("");
}

function updateLocalStorageSelectedPlayers() {
	localStorage.setItem("selected-players", JSON.stringify(selectedPlayers));
}

window.deletePlayerBadge = function (id) {
	const index = selectedPlayers.findIndex((player) => player.id == id);
	selectedPlayers[index] = "empty";
	displaySelectedPlayers(selectedPlayers);
	updateLocalStorageSelectedPlayers();
};

let indexInSeleceted;
window.placePlayer = function (event) {
	All(".terrain .player").forEach((p) => p.classList.remove("active-badge"));
	event.currentTarget.classList.add("active-badge");
	indexInSeleceted = event.currentTarget.dataset.index;
};

window.choosePlayer = function (event) {
	const player = players.find((player) => player.id == event.currentTarget.id);
	const isAlreadyChoosed = selectedPlayers.findIndex((p) => p.id == player.id) !== -1;
	if (indexInSeleceted && isAlreadyChoosed) alert("This player is already choosed");
	else {
		selectedPlayers[indexInSeleceted] = player;
		displaySelectedPlayers(selectedPlayers);
		updateLocalStorageSelectedPlayers();
		indexInSeleceted = null;
	}
};
