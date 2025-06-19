export const GeneralUtils = {
	slugify: (text: string) => text.replace(/\s+/g, '-').toLowerCase(),
	generateRandomIdentifier: (length: number) => Math.random().toString(36).substring(2, 2 + length),
}
export default GeneralUtils