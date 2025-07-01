export const Toast = {
	success: (message: string) => {
		console.log(`Success: ${message}`);
		alert(`Success: ${message}`);
	},
	error: (message: string) => {
		console.error(`Error: ${message}`);
		alert(`Error: ${message}`);
	},
	info: (message: string) => {
		console.info(`Info: ${message}`);
		alert(`Info: ${message}`);
	},
	warn: (message: string) => {
		console.warn(`Warning: ${message}`);
		alert(`Warning: ${message}`);
	},
	danger: (message: string) => {
		console.error(`Danger: ${message}`);
		alert(`Danger: ${message}`);
	}
}
export default Toast;