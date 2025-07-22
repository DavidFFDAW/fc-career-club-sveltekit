import { fail, json, redirect } from '@sveltejs/kit';
import { error } from 'console';

export const Helpers = {
	success: (message: string, status: number = 200) => {
		return {
			status,
			message
		};
	},
	error: (message: string, code?: number) => {
		return fail(code || 500, { message, error: message });
	},
    api: {
        json: (data: unknown, status: number = 200) => {
            return json(data, {
                status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        message: (message: string, status: number = 200) => {
            return json({ message }, { status });
		},
		error: (message: string, status: number = 500) => {
			return json({ error: message, message }, { status, headers: { 'Content-Type': 'application/json' } });
		}
    },
	redirect: (url: string, status: number = 302) => {
		const innerStatus = /30\d/g.test(status.toString()) ? status : 302;
        return redirect(innerStatus, url);
	},
	checkRequiredFields: (formData: FormData, requiredFields: string[]) => {
		const missingFields = requiredFields.filter(
			(field) => !formData.has(field) || !formData.get(field)
		);
		if (missingFields.length > 0)
			return { error: true, message: `Faltan campos requeridos: ${missingFields.join(', ')}` };
		return { error: false, message: '' };
	},
	getUpdatingId: (formData: FormData) => {
		if (!formData.has('_update_id'))
			throw new Error('No se ha encontrado el id para actualizar el recurso');

		const updateId = Number(formData.get('_update_id'));
		if (!updateId || isNaN(updateId) || !formData.has('_update_id')) {
			throw new Error('Formato de ID de actualización inválido');
		}
		
		return updateId;
	},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	tryCatch: async (errorMessage: string, fn: () => Promise<any>) => {
		try {
			return await fn();
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: errorMessage || 'Ocurrió un error inesperado',
				message: errorMessage || 'Ocurrió un error inesperado'
			});
		}
	},
    getFormAction: (formData: FormData) => {
        const action = formData.get('_action');
        if (typeof action !== 'string' || !action.trim()) 
            return null;

        return action.trim().toLowerCase();
    }
};

export default Helpers;
