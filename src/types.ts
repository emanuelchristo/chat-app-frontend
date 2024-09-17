export type User = {
	id: string
	name: string
	imgUrl: string
	isOnline: boolean
}

export type Chat = {
	id: string
	type: 'personal' | 'group'
	users: User[]
}

export type Message = {
	id: string
	chatId: string
	sentUser: User
	datetime: string
	text: string
	reactions: { userId: string; emoji: string }[]
	unread: boolean
}
