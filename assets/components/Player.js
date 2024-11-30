export default function (player) {
	return `<li onclick="choosePlayer(event)" class="player flex justify-between items-center gap-2 p-2.5 border-b border-gray-500 relative cursor-pointer hover:bg-gray-400 transition-colors active:scale-95" id="${player.id}">
				<div class="options absolute top-0 right-0.5 leading-[0]">
					<i
						onclick="openEditForm(${player.id})"
						class="fa-regular fa-pen-to-square text-[.75rem] hover:scale-125 transition-transform cursor-pointer"></i>
					<i
						onclick="deletePlayer(${player.id})"
						class="delete-icon fa-solid fa-xmark text-sm hover:scale-125 transition-transform cursor-pointer"></i>
				</div>
				<img class="avatar max-w-12  xs:max-w-10 sm:max-w-8 aspect-square object-cover" src="${player.photo}" alt="" />
				<h4 class="player-name text-[clamp(7px,1vw,14px)]">${player.name}</h4>
				<ul class="logos hidden sm:flex justify-center items-center gap-2 [&>li]:w-5">
					<li class="flag"><img src="${player.flag}" alt="" /></li>
					<li class="logo"><img src="${player.logo}" alt="" /></li>
					<li
						class="rating font-medium text-[8px] rounded-full leading-none aspect-square flex justify-center items-center bg-yellow-950 text-white"
						title="rating">
						${player.rating}
					</li>
				</ul>
			</li>
   `;
}
