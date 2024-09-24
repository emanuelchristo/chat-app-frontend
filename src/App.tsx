import type { Chat, Message, User, State, Action } from './types'

import { useEffect, useReducer } from 'react'
import { getRandString } from './utils/rand-string'
import { getAvatarUrl } from './utils/avatar'

import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'
import { CreateChatDialog } from './components/CreateChatDialog'
import { DeleteMessageDialog } from './components/DeleteMessageDialog'
import { DeleteChatDialog } from './components/DeleteChatDialog'
import { EditMessageDialog } from './components/EditMessageDialog'

const CURRENT_USER_ID = 'abcdefghijk'
const CURRENT_USER: User = {
	id: CURRENT_USER_ID,
	name: 'Emanuel Christo',
	imgUrl: getAvatarUrl(CURRENT_USER_ID + 'Emanuel Christo'),
	isOnline: true,
}

const initialState: State = {
	currentUser: CURRENT_USER,
	chats: [],
	messages: [],
	viewMode: 'spacious',
	selectedChatId: null,
	editMessageId: null,
	deleteMessageId: null,
	showChatCreate: false,
	showChatDelete: false,
}

const chatDataStr = localStorage.getItem('chatData')
if (chatDataStr) {
	const chatData = JSON.parse(chatDataStr)
	initialState.chats = chatData.chats ?? []
	initialState.messages = chatData.messages ?? []
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'CHAT_CREATE': {
			return { ...state, showChatCreate: true }
		}
		case 'CANCEL_CHAT_CREATE': {
			return { ...state, showChatCreate: false }
		}
		case 'OK_CHAT_CREATE': {
			if (!action.payload.chatName) return state

			const newUserId = getRandString()
			const newUser: User = {
				id: newUserId,
				name: action.payload.chatName,
				imgUrl: getAvatarUrl(newUserId + action.payload.chatName),
				isOnline: true,
			}

			const newChat: Chat = {
				id: getRandString(),
				type: 'personal',
				users: [newUser, { ...state.currentUser }],
			}

			return { ...state, showChatCreate: false, chats: [newChat, ...state.chats], selectedChatId: newChat.id }
		}
		case 'CHAT_DELETE': {
			return { ...state, showChatDelete: true }
		}
		case 'CANCEL_CHAT_DELETE': {
			return { ...state, showChatDelete: false }
		}
		case 'OK_CHAT_DELETE': {
			const newChats = state.chats.filter((chat) => chat.id !== state.selectedChatId)
			const newSelectedChatId = newChats.length > 0 ? newChats[0].id : null
			return { ...state, chats: newChats, selectedChatId: newSelectedChatId, showChatDelete: false }
		}
		case 'MSG_DELETE': {
			return { ...state, deleteMessageId: action.payload.messageId }
		}
		case 'CANCEL_MSG_DELETE': {
			return { ...state, deleteMessageId: null }
		}
		case 'OK_MSG_DELETE': {
			const newMsgs = state.messages.filter((msg) => msg.id !== state.deleteMessageId)
			return { ...state, messages: newMsgs, deleteMessageId: null }
		}
		case 'MSG_EDIT': {
			return { ...state, editMessageId: action.payload.messageId }
		}
		case 'CANCEL_MSG_EDIT': {
			return { ...state, editMessageId: null }
		}
		case 'OK_MSG_EDIT': {
			const editMsg = state.messages.find((msg) => msg.id === state.editMessageId) as Message
			editMsg.text = action.payload.text
			return { ...state, messages: [...state.messages], editMessageId: null }
		}
		case 'EMOJI': {
			const msg = { ...(state.messages.find((item) => item.id === action.payload.messageId) as Message) }
			const reaction = msg.reactions.find((item) => item.userId === state.currentUser.id)

			// If a reaction by current user already exists on the message
			if (reaction) {
				// If same emoji, then remove reaction
				if (reaction.emoji === action.payload.emoji)
					msg.reactions = msg.reactions.filter((item) => item.userId !== state.currentUser.id)
				// If different emoji, edit reaction
				else reaction.emoji = action.payload.emoji
			}
			// Add new reaction
			else {
				msg.reactions.push({ emoji: action.payload.emoji, userId: state.currentUser.id })
			}

			return { ...state, messages: [...state.messages] }
		}
		case 'MSG_SEND': {
			if (!action.payload.text) return state

			const newMessage: Message = {
				id: getRandString(),
				chatId: state.selectedChatId as string,
				sentUser: { ...state.currentUser },
				datetime: new Date().toJSON(),
				text: action.payload.text,
				reactions: [],
				unread: false,
			}

			return { ...state, messages: [...state.messages, newMessage] }
		}
		case 'CHAT_SELECT': {
			return { ...state, selectedChatId: action.payload.chatId }
		}
		case 'VIEW_MODE': {
			return { ...state, viewMode: action.payload.viewMode }
		}
		default:
			return state
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Save state to local storage
	useEffect(() => {
		localStorage.setItem('chatData', JSON.stringify({ chats: state.chats, messages: state.messages }))
	}, [state.chats, state.messages])

	return (
		<div className='app'>
			<ChatsPane
				chats={state.chats}
				messages={state.messages}
				currentUserId={state.currentUser.id}
				selectedChatId={state.selectedChatId}
				viewMode={state.viewMode}
				dispatch={dispatch}
			/>

			<MessagesPane
				chats={state.chats}
				messages={state.messages}
				currentUserId={state.currentUser.id}
				selectedChatId={state.selectedChatId}
				viewMode={state.viewMode}
				dispatch={dispatch}
			/>

			<CreateChatDialog
				show={state.showChatCreate}
				onCancel={() => dispatch({ type: 'CANCEL_CHAT_CREATE' })}
				onOk={(val) => dispatch({ type: 'OK_CHAT_CREATE', payload: { chatName: val } })}
			/>

			<EditMessageDialog
				messages={state.messages}
				editMessageId={state.editMessageId}
				onCancel={() => dispatch({ type: 'CANCEL_MSG_EDIT' })}
				onOk={(text) => dispatch({ type: 'OK_MSG_EDIT', payload: { text: text } })}
			/>

			<DeleteMessageDialog
				show={!!state.deleteMessageId}
				onCancel={() => dispatch({ type: 'CANCEL_MSG_DELETE' })}
				onOk={() => dispatch({ type: 'OK_MSG_DELETE' })}
			/>

			<DeleteChatDialog
				show={state.showChatDelete}
				onCancel={() => dispatch({ type: 'CANCEL_CHAT_DELETE' })}
				onOk={() => dispatch({ type: 'OK_CHAT_DELETE' })}
			/>
		</div>
	)
}
