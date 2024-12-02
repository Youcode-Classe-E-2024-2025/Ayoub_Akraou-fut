export default function (player, classes, index) {
	return `<div onclick="placePlayer(event, ${index}, '${player.position}')" class="player cursor-pointer hover:scale-110 transition-transform flex justify-center items-center scale-up ${classes}" data-index="${index} data-position="${player.position}">
					<img class="badge-bg" src="./assets/images/placeholder-card-normal.webp" alt="" />
					<div class="max-w-[40%] mx-auto relative">
						<svg class="max-w-full text-emerald-400" viewBox="0 0 36 42" fill="none" width="36">
							<path
								d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z"
								stroke="currentColor"
								stroke-width="1.5"></path>
						</svg>
						<span
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-medium text-emerald-400"
							>+</span
						>
					</div>
				</div>
`;
}
