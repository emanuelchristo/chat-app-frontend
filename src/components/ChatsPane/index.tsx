import type { Chat, User, Message } from '../../types'
import { ChatItem } from '../ChatItem'
import { CreateButton, SearchBox } from '../SearchBox'
import { ViewMode } from '../ViewMode'

import styles from './ChatsPane.module.css'

type ChatsPaneProps = {
	chats: Chat[]
	messages: Message[]
	chatSearchVal: string
	onChatSearchChange: (val: string) => void
	onCreate: () => void
	selectedChatId: string | null
	onChatSelect: (chatId: string) => void
	currentUserId: string
	viewMode: 'spacious' | 'compact'
	onViewModeChange: (viewMode: 'spacious' | 'compact') => void
}

export const ChatsPane = ({
	chats,
	messages,
	chatSearchVal,
	onChatSearchChange,
	onCreate,
	selectedChatId,
	onChatSelect,
	currentUserId,
	viewMode,
	onViewModeChange,
}: ChatsPaneProps) => {
	return (
		<div className={styles['chats-pane']}>
			<div className={styles['chats-header']}>
				<div className={styles['chats-title-wrapper']}>
					<div className={styles['chats-icon-wrapper']}>
						<img src='/images/chat.png' alt='Chat icon' draggable='false' />
					</div>
					<h1>Chats</h1>
				</div>
				<ViewMode viewMode={viewMode} onViewModeChange={onViewModeChange} />
			</div>

			<div className={styles['search-wrapper']}>
				<SearchBox val={chatSearchVal} onChange={onChatSearchChange} />
				<CreateButton onClick={onCreate} />
			</div>

			{chats.length > 0 ? (
				<div className={styles['chats-container']}>
					{chats.map((chat) => {
						const chatUser = chat.users.find((item) => item.id !== currentUserId) as User
						const lastMessage = [...messages].reverse().find((item) => item.chatId === chat.id)
						const unreadCount = messages.filter((item) => item.chatId === chat.id && item.unread).length
						return (
							<ChatItem
								name={chatUser.name}
								imageUrl={chatUser.imgUrl}
								preview={lastMessage?.text ?? ''}
								datetime={lastMessage?.datetime ?? null}
								unreadCount={unreadCount}
								online={chatUser.isOnline}
								viewMode={viewMode}
								selected={selectedChatId === chat.id}
								onClick={() => onChatSelect(chat.id)}
							/>
						)
					})}
				</div>
			) : (
				<div className={styles['chats-empty']}>
					<img src='/images/chats-empty.png' alt='Chats empty icon' draggable='false' />
					<p>No chats. Create one</p>
				</div>
			)}

			<div className={styles['made-by']}>
				<p>
					Made 💙 with by{' '}
					<a href='https://ecris.in' target='_blank' rel='noreferrer'>
						Cris
					</a>
				</p>
			</div>
		</div>
	)
}
