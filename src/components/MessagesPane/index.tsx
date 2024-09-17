import type { Chat, Message } from '../../types'

import { MessageComposer } from '../MessageComposer'
import { MessageItem } from '../MessageItem'
import { MessagesHeader } from '../MessagesHeader'

import styles from './MessagesPane.module.css'

type MessagesPaneProps = {
	chats: Chat[]
	messages: Message[]
	selectedChatId: string | null
	currentUserId: string
	onChatDelete: () => void
	onEmoji: (messageId: string, emoji: string) => void
	onMessageDelete: (messageId: string) => void
	onEdit: (messageId: string) => void
	composerValue: string
	onComposerChange: (val: string) => void
	onSend: () => void
}

export const MessagesPane = ({
	chats,
	messages,
	selectedChatId,
	currentUserId,
	onChatDelete,
	onEmoji,
	onMessageDelete,
	onEdit,
	composerValue,
	onComposerChange,
	onSend,
}: MessagesPaneProps) => {
	const currentChat = chats.find((item) => item.id === selectedChatId)
	const currentChatUser = currentChat?.users.find((item) => item.id !== currentUserId)

	if (!currentChatUser) return <MessagesPaneEmpty />
	else
		return (
			<div className={styles['messages-pane']}>
				<MessagesHeader
					name={currentChatUser.name}
					imgUrl={currentChatUser.imgUrl}
					isOnline={currentChatUser.isOnline}
					onChatDelete={() => onChatDelete()}
				/>
				{messages.length > 0 ? (
					<div className={styles['messages-container']}>
						{messages.map((item) => (
							<MessageItem
								key={item.id}
								message={item}
								onEmoji={(emoji) => onEmoji(item.id, emoji)}
								onDelete={() => onMessageDelete(item.id)}
								onEdit={() => onEdit(item.id)}
								currentUserId={currentUserId}
							/>
						))}
					</div>
				) : (
					<div className={styles['no-messages']}>No messages yet</div>
				)}

				<MessageComposer value={composerValue} onChange={onComposerChange} onSend={onSend} />
			</div>
		)
}

const MessagesPaneEmpty = () => {
	return (
		<div className={styles['messages-pane-empty']}>
			<div className={styles['messages-pane-empty-icon']}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<p>Select a chat to get started</p>
		</div>
	)
}
