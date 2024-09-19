export const getAvatarUrl = (name: string) => {
	const N_IMAGES = 20

	let sum = 0
	for (let i = 0; i < name.length; i++) {
		sum += name.charCodeAt(i)
	}

	const imageIndex = (sum % N_IMAGES) + 1

	return `/avatars/${imageIndex}.jpg`
}
