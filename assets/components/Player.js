export default function (player) {
	return `<li class="player flex justify-between items-center gap-2 p-2 border-b border-gray-500">
					<img class="avatar max-w-8 xs:max-w-10" src="${player.photo}" alt="" />
					<h4 class="player-name text-[clamp(7px,1vw,14px)]">${player.name}</h4>
					<ul class="logos  flex justify-center items-center gap-2 [&>li]:w-5">
						<li class="flag"><img src="${player.flag}" alt="" /></li>
						<li class="logo"><img src="${player.logo}" alt="" /></li>
						<li class="rating font-medium text-[8px] rounded-full leading-none aspect-square flex justify-center items-center bg-yellow-950 text-white" title="rating">${player.rating}</li>
					</ul>
				</li>
   `;
}
