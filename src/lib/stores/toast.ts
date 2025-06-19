import { writable } from 'svelte/store';

interface Alert {
	id: number;
	message: string;
	type: string;
	timeout: number;
}

export const alerts = writable(Array<Alert>());

function add(message: string, type:string, timeout = 4000) {
	const id = Date.now() + Math.random(); // ID único para cada alerta
	alerts.update(currentAlerts => [
		...currentAlerts,
		{
			id,
			message,
			type,
			timeout
		}
	]);

	setTimeout(() => {
		removeAlert(id);
	}, timeout);
}

function removeAlert(id: number) {
	alerts.update(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
}

export const ToastUtils = {
	add,
	removeAlert
};

export default ToastUtils;
