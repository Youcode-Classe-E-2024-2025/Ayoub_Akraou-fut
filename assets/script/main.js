import { el, All } from "./lib.js";
import Player from "../components/Player.js";
import PlayerBadge from "../components/PlayerBadge.js";
import EmptyPlayerBadge from "../components/EmptyPlayerBadge.js";
import Overlay from "../components/Overlay.js";
import AddForm from "../components/AddForm.js";
import EditForm from "../components/EditForm.js";
import Loader from "../components/Loader.js";

// for github pages
let dataPath = "/Ayoub_Akraou-fut/assets/data/data.json";
// for live server
if (window.location.href.includes("http://127.0.0.1:5500/")) {
	dataPath = "/assets/data/data.json";
}

let players;
let selectedPlayers;
const initialSelectedPlayers = [
	{ position: "ST" },
	{ position: "ST" },
	{ position: "M" },
	{ position: "M" },
	{ position: "M" },
	{ position: "M" },
	{ position: "B" },
	{ position: "B" },
	{ position: "B" },
	{ position: "B" },
	{ position: "GK" },
];
// update players array in localstorage
function updateLocalStoragePlayers() {
	localStorage.setItem("players", JSON.stringify(players));
}

fetch(dataPath)
	.then((response) => response.json())
	.then((data) => {
		// if there is not a property "players" in localestorage use the fetched data as an initial value;
		players = JSON.parse(localStorage.getItem("players")) || data.players;
		updateLocalStoragePlayers();

		selectedPlayers = JSON.parse(localStorage.getItem("selected-players")) || [...initialSelectedPlayers];
		displaySelectedPlayers(selectedPlayers);
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
window.deletePlayer = function (event, id) {
	const element = event.currentTarget.closest(".player");
	const deletedPlayer = players.find((player) => player.id == id);
	players = players.filter((player) => player.id != id);
	// displayPlayersList(players);
	element.classList.add("fade-out");
	element.addEventListener("animationend", function () {
		this.remove();
	});
	updateLocalStoragePlayers();
	selectedPlayers = selectedPlayers.map((player) => (player.id == id ? { position: deletedPlayer.position } : player));
	displaySelectedPlayers(selectedPlayers);
};
// open EditForm
window.openEditForm = function (id) {
	const player = players.find((player) => player.id == id);
	el("body").insertAdjacentHTML("beforeend", Overlay(EditForm(player)));
	console.log(selectedPlayers[0].name);
};

// editPlayer
window.editPlayer = function (event, id) {
	event.preventDefault();
	if (!validateForm()) return;
	const updatedPlayer = getFormData();
	// update player in the players list
	const indexInPlayers = players.findIndex((player) => player.id == id);
	players[indexInPlayers] = {
		...updatedPlayer,
		id: players[indexInPlayers].id,
	};
	// update the UI and localStorage
	displayPlayersList(players);
	updateLocalStoragePlayers();

	// update the player in selectedPlayer (en terrain)
	const indexInSelectedP = selectedPlayers.findIndex((player) => player.id == id);
	players[indexInSelectedP] = {
		...updatedPlayer,
		id: players[indexInSelectedP].id,
	};
	// update the UI and localStorage
	displaySelectedPlayers(selectedPlayers);
	updateLocalStorageSelectedPlayers();
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

// display 11 selected players in the stadium
function displaySelectedPlayers(selectedPlayers) {
	el(".terrain").innerHTML = selectedPlayers
		.map((player, i) =>
			!player.name ? EmptyPlayerBadge(player, `position-${i + 1}`, i) : PlayerBadge(player, `position-${i + 1}`, i)
		)
		.join("");
}

function updateLocalStorageSelectedPlayers() {
	localStorage.setItem("selected-players", JSON.stringify(selectedPlayers));
}

// deletePlayer from stadium
window.deletePlayerBadge = function (id) {
	const index = selectedPlayers.findIndex((player) => player.id == id);
	selectedPlayers[index] = { ...initialSelectedPlayers[index] };
	displaySelectedPlayers(selectedPlayers);
	updateLocalStorageSelectedPlayers();
	displayPlayersList(players);
};

let indexInSeleceted;
// select placeholder player badge
window.placePlayer = function (event, index, position) {
	All(".terrain .player").forEach((p) => p.classList.remove("active-badge"));
	event.currentTarget.classList.add("active-badge");
	indexInSeleceted = index;
	const filteredPlayers = players.filter((player) =>
		player.position.toLowerCase().includes(position.toLowerCase().at(-1))
	);
	displayPlayersList(filteredPlayers);
};

// choose player and display it in stadium
window.choosePlayer = function (event) {
	const player = players.find((player) => player.id == event.currentTarget.id);
	const isAlreadyChoosed = selectedPlayers.findIndex((p) => p.id == player?.id) !== -1;
	if (indexInSeleceted && isAlreadyChoosed) alert("This player is already choosed");
	else {
		selectedPlayers[indexInSeleceted] = player;
		displaySelectedPlayers(selectedPlayers);
		updateLocalStorageSelectedPlayers();
		indexInSeleceted = null;
		displayPlayersList(players);
	}
};

// add loader
document.body.insertAdjacentHTML("beforeend", Loader());
// if the document finshed loading apply a fadeout animation
window.addEventListener("load", function () {
	setTimeout(() => el("#loader").classList.add("fade-out"), 500);
	// if the animation finished remove loader
	el("#loader").addEventListener("animationend", () => el("#loader").remove());
});

// clear selected players
el("#clear").addEventListener("click", () => {
	selectedPlayers = [...initialSelectedPlayers];
	displaySelectedPlayers(selectedPlayers);
	updateLocalStorageSelectedPlayers();
	displayPlayersList(players);
});
