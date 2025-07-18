import Helpers from '$lib/server/utils/server.helper';

export const actions = {
    default: async ({ request }) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 2000);
        });

        const response = await promise;
        if (response) {
            return Helpers.success('Action completed successfully', 200);
        } else {
            return Helpers.error('Action failed', 500);
        }
    }
};