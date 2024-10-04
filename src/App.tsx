import { AppStateProvider } from './contexts/AppStateContext'
import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'
import { CreateChatDialog } from './components/CreateChatDialog'
import { DeleteMessageDialog } from './components/DeleteMessageDialog'
import { DeleteChatDialog } from './components/DeleteChatDialog'
import { EditMessageDialog } from './components/EditMessageDialog'

export default function App() {
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
