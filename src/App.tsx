import { useEffect } from 'react'
import { useAppState } from './contexts/AppStateContext'

import { AppStateProvider } from './contexts/AppStateContext'
import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'
import { CreateChatDialog } from './components/CreateChatDialog'
import { DeleteMessageDialog } from './components/DeleteMessageDialog'
import { DeleteChatDialog } from './components/DeleteChatDialog'
import { EditMessageDialog } from './components/EditMessageDialog'

export default function App() {
	const { chats, messages } = useAppState()

	// Save state to local storage
	useEffect(() => {
		localStorage.setItem('chatData', JSON.stringify({ chats: chats, messages: messages }))
	}, [chats, messages])

	return (
		<AppStateProvider>
			<div className='app'>
				<ChatsPane />
				<MessagesPane />

				<CreateChatDialog />
				<EditMessageDialog />
				<DeleteMessageDialog />
				<DeleteChatDialog />
			</div>
		</AppStateProvider>
	)
}
