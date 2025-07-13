import { fail, redirect } from '@sveltejs/kit';

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
    redirect: (url: string, status: number = 302) => {
        throw redirect(status, url);
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
