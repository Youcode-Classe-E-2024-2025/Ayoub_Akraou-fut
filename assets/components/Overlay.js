export default function (child) {
	window.closeOverlay = function (event) {
		const overlay = event.currentTarget;
		const clickedElement = event.target;
		const closeIcone = overlay.querySelector(".close-icon");
		if (clickedElement === overlay || clickedElement === closeIcone) {
			overlay.classList.replace("fade-in", "fade-out");
			overlay.addEventListener("animationend", () => overlay.remove());
		}
	};

	return `
      <div onclick="closeOverlay(event)" class="overlay transition-all duration-300 fade-in fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex justify-center items-center p-8">
         ${child}
      </div>
   `;
}
