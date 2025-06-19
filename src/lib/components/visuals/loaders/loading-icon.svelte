<div class="loading-icon-container">
  <div class="loading-pulse-icon">
	<img src="/images/botaniq-no-bg.png" alt="Loading..." />
  </div>
</div>

<style>
	.loading-icon-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		z-index: 9999;
	}

	.loading-pulse-icon img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
</style>