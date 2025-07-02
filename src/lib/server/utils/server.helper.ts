import { fail } from '@sveltejs/kit';

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
		console.log('Update ID:', updateId);
		
		if (!updateId || isNaN(updateId) || !formData.has('_update_id')) {
			throw new Error('Formato de ID de actualización inválido');
		}
		
		return updateId;
	},
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
	}
};

export default Helpers;
