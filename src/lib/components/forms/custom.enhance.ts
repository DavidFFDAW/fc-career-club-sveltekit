import { invalidate, invalidateAll } from '$app/navigation';
import Toast from '$lib/services/toast.service';
import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

export type CustomEnhanceAfterSubmit = (args: any) => void | null | undefined;

export const customEnhance = (afterSubmit: CustomEnhanceAfterSubmit): SubmitFunction => {
	const submitForm: SubmitFunction = ({ cancel }) => {
		const buttonInitiator = document.activeElement as HTMLButtonElement;
		if (buttonInitiator instanceof HTMLButtonElement) buttonInitiator.disabled = true;
		const shouldAskConfirmation = buttonInitiator.dataset.confirm === 'true';
		const shouldContinue = shouldAskConfirmation
			? confirm('¿Estás seguro de que deseas hacer esto?')
			: true;

		if (!shouldContinue) {
			buttonInitiator.disabled = false;
			cancel();
		}

		return async ({ result, update }) => {
			const response = result as ActionResult & { data: any };
			const hasError = result.type === 'error' || result.type === 'failure';
			if (afterSubmit) afterSubmit({ response, hasError, update, invalidate, buttonInitiator });

			if (hasError) {
				buttonInitiator.disabled = false;
				const errorMessage =
					response.data?.message ||
					'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
				return Toast.error(errorMessage);
			}

			const hasSuccess = !hasError && /20\d/g.test(result.status.toString());

			if (hasSuccess) {
				// const successMessage = response.data?.message || '¡Operación exitosa!';
				await update({ reset: false });
				await invalidateAll();
				buttonInitiator.disabled = false;
				// return Toast.success(successMessage);
			}
		};
	};

	return submitForm;
};