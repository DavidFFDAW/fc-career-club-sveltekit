import { invalidate, invalidateAll } from '$app/navigation';
import Toast from '$lib/services/toast.service';
import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomEnhanceAfterSubmit = (args: any) => void | null | undefined;
export type FormOptions = {
    reset?: boolean;
    setLoading: (value: boolean) => void;
}

export const customEnhance = (afterSubmit: CustomEnhanceAfterSubmit, options: FormOptions): SubmitFunction => {
	const submitForm: SubmitFunction = ({ cancel, formElement }) => {
        const redirect = formElement.dataset.redirect;
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
        options.setLoading(true);

		return async ({ result, update }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = result as ActionResult & { data: any };
			console.log('Response from action:', response);
			
			const hasError = result.type === 'error' || result.type === 'failure';
			if (afterSubmit) afterSubmit({ response, hasError, update, invalidate, buttonInitiator });

			if (hasError) {
				buttonInitiator.disabled = false;
                options.setLoading(false);
				const errorMessage =
					response.data?.message ||
					'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
				return Toast.error(errorMessage);
			}

			const hasSuccess = !hasError && /20\d/g.test(result.status?.toString());
			const hasRedirect = (response.type === 'redirect' && response.location);

			if (hasSuccess || hasRedirect) {
				const successMessage = response.data?.message || '¡Operación exitosa!';
				await update({ reset: options.reset });
				await invalidateAll();
				buttonInitiator.disabled = false;
                options.setLoading(false);
				Toast.success(successMessage);

				const hasRedirect = Boolean(redirect) || (response.type === 'redirect' && response.location);
				const redirectUrl = 'location' in response ? response.location : redirect;

				if (hasRedirect) {
                    setTimeout(() => {
						window.location.href = redirectUrl as string;
                    }, 400);
                }
			}
		};
	};

	return submitForm;
};