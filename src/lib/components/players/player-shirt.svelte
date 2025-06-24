<script lang="ts">
	export let name: string;
	export let number: number | string;
	export let width: number = 140;
</script>

<div class="player-shirt-container" style="--width: {width}px;">
	<svg
		version="1.0"
		xmlns="http://www.w3.org/2000/svg"
		width="300.000000pt"
		height="303.000000pt"
		viewBox="0 0 300.000000 303.000000"
		preserveAspectRatio="xMidYMid meet"
	>
		<g
			transform="translate(0.000000,303.000000) scale(0.100000,-0.100000)"
			fill="#d98320"
			stroke="none"
		>
			<path
				d="M1058 2987 c-67 -55 -64 -54 -281 -143 -332 -138 -364 -163 -465 -362 -134 -265 -314 -652 -309 -665 7 -18 450 -257 476 -257 14 0 37 29 87 111 36 61 70 107 74 102 5 -4 14 -93 21 -197 18 -282 2 -1165 -26 -1408 -7 -56 14 -82 73 -92 555 -97 1035 -100 1536 -9 113 20 130 34 121 106 -29 260 -45 1129 -26 1417 7 101 15 188 18 193 3 5 36 -44 75 -107 61 -103 72 -116 96 -116 15 0 36 6 47 14 11 7 58 34 105 59 253 136 306 167 314 180 10 15 -100 257 -290 637 -109 220 -148 255 -399 360 -55 22 -145 60 -200 83 -64 27 -121 59 -158 90 l-58 49 -47 -20 c-165 -70 -516 -71 -678 -2 -25 11 -47 20 -49 20 -2 0 -27 -20 -57 -43z"
			/>
		</g>
	</svg>

	<div class="player-shirt-name-container">
		<p class="player-shirt-name comfortaa">{name}</p>
		<p class="player-shirt-number montserrat">{number}</p>
	</div>
</div>

<style>
	.player-shirt-container {
		position: relative;
		width: var(--width);
		max-width: var(--width);
	}
	.player-shirt-container svg {
		width: 100%;
		max-width: 100%;
		height: auto;
		display: block;
	}

	.player-shirt-name-container .player-shirt-name,
	.player-shirt-name-container .player-shirt-number {
		display: block;
		position: absolute;
		width: 100%;
		max-width: var(--width);
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.player-shirt-name-container .player-shirt-name {
		top: calc(var(--width) * 13 / 140);
		left: 50%;
		transform: translateX(-50%) scale(0.8, 1.05);
		font-size: 13px;
		font-weight: 800;
		color: #000;
		text-transform: uppercase;
		letter-spacing: .6px;
	}
	.player-shirt-name-container .player-shirt-number {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scaleY(1.5);
		font-size: 3rem;
		font-weight: 700;
		color: #000;
	}
</style>
