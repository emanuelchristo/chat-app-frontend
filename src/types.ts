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
	lastMessage?: string
	unreadCount?: number
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

export type ViewMode = 'spacious' | 'compact'

export type State = {
	currentUser: User
	chats: Chat[]
	messages: Message[]
	viewMode: ViewMode
	selectedChatId: null | string
	editMessageId: null | string
	deleteMessageId: null | string
	showChatCreate: boolean
	showChatDelete: boolean
}

export type Action =
	| { type: 'CHAT_CREATE' }
	| { type: 'CANCEL_CHAT_CREATE' }
	| { type: 'OK_CHAT_CREATE'; payload: { chatName: string } }
	| { type: 'CHAT_DELETE' }
	| { type: 'CANCEL_CHAT_DELETE' }
	| { type: 'OK_CHAT_DELETE' }
	| { type: 'MSG_DELETE'; payload: { messageId: string } }
	| { type: 'CANCEL_MSG_DELETE' }
	| { type: 'OK_MSG_DELETE' }
	| { type: 'MSG_EDIT'; payload: { messageId: string } }
	| { type: 'CANCEL_MSG_EDIT' }
	| { type: 'OK_MSG_EDIT'; payload: { text: string } }
	| { type: 'EMOJI'; payload: { messageId: string; emoji: string } }
	| { type: 'MSG_SEND'; payload: { text: string } }
	| { type: 'CHAT_SELECT'; payload: { chatId: string } }
	| { type: 'VIEW_MODE'; payload: { viewMode: ViewMode } }
