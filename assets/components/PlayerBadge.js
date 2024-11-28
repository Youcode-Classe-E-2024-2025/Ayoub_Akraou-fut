export default function (player, classes, index) {
	const statistic =
		player.position.toUpperCase() == "GK"
			? `<li class="diving"><abbr title="diving">PC</abbr><br />${player.diving}</li>
<!-- <li class="handling"><abbr title="handling">SH</abbr><br />${player.handling}</li>-->
<li class="kicking"><abbr title="kicking">PS</abbr><br />${player.kicking}</li>
<li class="reflexes"><abbr title="reflexes">DR</abbr><br />${player.reflexes}</li>
<li class="speed"><abbr title="speed">DF</abbr><br />${player.speed}</li>
<li class="positioning"><abbr title="positioning">PH</abbr><br />${player.positioning}</li>`
			: `<li class="pace"><abbr title="pace">PC</abbr><br />${player.pace}</li>
<li class="shooting"><abbr title="shooting">SH</abbr><br />${player.shooting}</li>
<li class="passing"><abbr title="passing">PS</abbr><br />${player.passing}</li>
<!-- <li class="dribbling"><abbr title="dribbling">DR</abbr><br />${player.dribbling}</li> -->
<li class="defending"><abbr title="defending">DF</abbr><br />${player.defending}</li>
<li class="physical"><abbr title="physical">PH</abbr><br />${player.physical}</li>`;

	return `<div onclick="placePlayer(event)" class="player ${classes}" data-index="${index}">
					<i
					onclick="deletePlayerBadge(${player.id})"
					class="delete-icon fa-solid fa-xmark bg-white/20 rounded-full w-3 !flex justify-center items-center aspect-square text-sm hover:scale-125 transition-transform cursor-pointer absolute top-1 right-0"></i>
					<img class="badge-bg" src="./assets/images/badge.png" alt="" />
					<img class="photo" src="${player.photo}" alt="" />
					<h3 class="player-name">${player.name.split(" ").slice(-1)}</h3>
					<ul class="statistic">
						${statistic}
					</ul>
					<ul class="logos">
						<li class="flag"><img src="${player.flag}" alt="" /></li>
						<li class="logo"><img src="${player.logo}" alt="" /></li>
						<li class="rating" title="rating">${player.rating}</li>
					</ul>
				</div>
`;
}
