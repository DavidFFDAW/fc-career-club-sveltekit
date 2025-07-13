import ToastUtils from "$lib/stores/toast";

export const Toast = {
	success: (message: string) => {
		console.log(`Success: ${message}`);
        ToastUtils.add(message, 'success');
	},
	error: (message: string) => {
		console.error(`Error: ${message}`);
		ToastUtils.add(message, 'error');
	},
	info: (message: string) => {
		console.info(`Info: ${message}`);
		ToastUtils.add(message, 'info');
	},
	warn: (message: string) => {
		console.warn(`Warning: ${message}`);
        ToastUtils.add(message, 'warning');
	},
	danger: (message: string) => {
		console.error(`Danger: ${message}`);
		ToastUtils.add(message, 'error');
	}
}
export default Toast;