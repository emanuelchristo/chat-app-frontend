import type { Chat, Message, User } from './types'
import { useState } from 'react'
import { getRandString } from './utils/rand-string'

import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'

import styles from './App.module.css'
import { CreateChatDialog, ModalDialog } from './components/ModalDialog'

const CURRENT_USER_ID = 'abcdefghijk'

const CURRENT_USER: User = {
	id: CURRENT_USER_ID,
	name: 'Emanuel Christo',
	imgUrl: '',
	isOnline: true,
}

export default function App() {
	const [chats, setChats] = useState<Chat[]>([])
	const [messages, setMessages] = useState<Message[]>([])
	const [selectedChatId, setSelectedChatId] = useState<null | string>(null)
	const [composerVal, setComposerVal] = useState('')
	const [chatSearchVal, setChatSearchVal] = useState('')
	const [viewMode, setViewMode] = useState<'spacious' | 'compact'>('spacious')

	const [editInProgress, setEditInProgress] = useState<null | string>(null)
	const [showChatCreateDialog, setShowChatCreateDialog] = useState(false)
	const [showChatDeleteDialog, setShowChatDeleteDialog] = useState(false)

	return (
		<div className={styles['app']}>
			<ChatsPane
				chats={chats}
				messages={messages}
				onCreate={() => {
					setShowChatCreateDialog(true)
				}}
				chatSearchVal={chatSearchVal}
				onChatSearchChange={setChatSearchVal}
				selectedChatId={selectedChatId}
				onChatSelect={setSelectedChatId}
				currentUserId={CURRENT_USER_ID}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>
			<MessagesPane
				chats={chats}
				messages={messages}
				selectedChatId={selectedChatId}
				currentUserId={CURRENT_USER_ID}
				viewMode={viewMode}
				onChatDelete={() => {
					setShowChatDeleteDialog(true)
				}}
				onEmoji={(messageId: string, emoji: string) => {
					const msg = messages.find((item) => item.id === messageId) as Message
					const reac = msg.reactions.find((item) => item.userId === CURRENT_USER_ID)

					// If a reaction by current user already exists on the message
					if (reac) {
						// If same emoji, then remove reaction
						if (reac.emoji === emoji) msg.reactions = msg.reactions.filter((item) => item.userId !== CURRENT_USER_ID)
						// If different emoji, edit reaction
						else reac.emoji = emoji
					}
					// Add new reaction
					else {
						msg.reactions.push({ emoji, userId: CURRENT_USER_ID })
					}

					setMessages([...messages])
				}}
				onMessageDelete={(messageId: string) => {
					if (editInProgress) return
					setMessages(messages.filter((item) => item.id !== messageId))
				}}
				onEdit={(messageId: string) => {
					setEditInProgress(messageId)
					const msg = messages.find((item) => item.id === messageId) as Message
					setComposerVal(msg.text)
				}}
				composerValue={composerVal}
				onComposerChange={setComposerVal}
				editInProgress={editInProgress}
				onSend={() => {
					if (composerVal === '') return

					if (editInProgress) {
						const msg = messages.find((item) => item.id === editInProgress) as Message
						msg.text = composerVal
						setMessages([...messages])
						setComposerVal('')
						setEditInProgress(null)
						return
					}

					const newMessage: Message = {
						id: getRandString(),
						chatId: selectedChatId as string,
						sentUser: CURRENT_USER,
						datetime: new Date().toJSON(),
						text: composerVal,
						reactions: [],
						unread: false,
					}

					setMessages((curr) => [...curr, newMessage])
					setComposerVal('')
				}}
			/>

			{showChatCreateDialog && (
				<CreateChatDialog
					onCancel={() => {
						setShowChatCreateDialog(false)
					}}
					onOk={(val: string) => {
						if (!val) return

						const newUser: User = {
							id: getRandString(),
							name: val,
							imgUrl: '',
							isOnline: true,
						}

						const newChat: Chat = {
							id: getRandString(),
							type: 'personal',
							users: [newUser, CURRENT_USER],
						}

						setChats((curr) => [newChat, ...curr])
						setSelectedChatId(newChat.id)
						setShowChatCreateDialog(false)
					}}
				/>
			)}

			{showChatDeleteDialog && (
				<ModalDialog
					primaryAction='Delete'
					primaryColor='red'
					secondaryAction='Cancel'
					title='Delete Chat'
					onCancel={() => setShowChatDeleteDialog(false)}
					onOk={() => {
						setMessages(messages.filter((item) => item.chatId !== selectedChatId))
						const newChats = chats.filter((item) => item.id !== selectedChatId)
						setChats(newChats)
						const newSelectedChatId = newChats.length > 0 ? newChats[0].id : null
						setSelectedChatId(newSelectedChatId)
						setShowChatDeleteDialog(false)
					}}
				>
					<p className=' max-w-[80%] text-center m-auto'>Are you sure to delete this chat and all its messages?</p>
				</ModalDialog>
			)}
		</div>
	)
}
