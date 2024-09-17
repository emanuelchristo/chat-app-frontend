import type { Chat, Message } from './types'
import { useState } from 'react'

import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'

import styles from './App.module.css'

const CURRENT_USER_ID = 'abcdefghijk'

export default function App() {
	const [chats, setChats] = useState<Chat[]>([])
	const [messages, setMessages] = useState<Message[]>([])
	const [selectedChatId, setSelectedChatId] = useState<null | string>(null)
	const [composerVal, setComposerVal] = useState('')
	const [chatSearchVal, setChatSearchVal] = useState('')

	return (
		<div className={styles['app']}>
			<ChatsPane
				chats={chats}
				messages={messages}
				onCreate={() => {}}
				chatSearchVal={chatSearchVal}
				onChatSearchChange={setChatSearchVal}
				selectedChatId={selectedChatId}
				onChatSelect={setSelectedChatId}
				currentUserId={CURRENT_USER_ID}
			/>
			<MessagesPane
				chats={chats}
				messages={messages}
				selectedChatId={selectedChatId}
				currentUserId={CURRENT_USER_ID}
				onChatDelete={() => {}}
				onEmoji={() => {}}
				onMessageDelete={() => {}}
				onEdit={() => {}}
				composerValue={composerVal}
				onComposerChange={setComposerVal}
				onSend={() => {}}
			/>
		</div>
	)
}
