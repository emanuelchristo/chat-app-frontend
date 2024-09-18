import type { Chat, Message } from '../../types'
import { useRef, useEffect, useState } from 'react'

import { MessageComposer } from '../MessageComposer'
import { MessageItem } from '../MessageItem'
import { MessagesHeader } from '../MessagesHeader'

import styles from './MessagesPane.module.css'

type MessagesPaneProps = {
	chats: Chat[]
	messages: Message[]
	selectedChatId: string | null
	currentUserId: string
	viewMode: 'compact' | 'spacious'
	onChatDelete: () => void
	onEmoji: (messageId: string, emoji: string) => void
	onMessageDelete: (messageId: string) => void
	onEdit: (messageId: string) => void
	editInProgress: string | null
	composerValue: string
	onComposerChange: (val: string) => void
	onSend: () => void
}

export const MessagesPane = ({
	chats,
	messages,
	selectedChatId,
	currentUserId,
	viewMode,
	onChatDelete,
	onEmoji,
	onMessageDelete,
	onEdit,
	editInProgress,
	composerValue,
	onComposerChange,
	onSend,
}: MessagesPaneProps) => {
	const currentChat = chats.find((item) => item.id === selectedChatId)
	const currentChatUser = currentChat?.users.find((item) => item.id !== currentUserId)
	const shownMessages = messages.filter((item) => item.chatId === selectedChatId)

	const [prevMessages, setPrevMessages] = useState<Message[]>([])
	const messagesContainer = useRef(null)

	useEffect(() => {
		// Checking if there is a different last message, if yes scrolling to bottom
		const prevLastMsgId = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1].id : null
		const lastMsgId = messages.length > 0 ? messages[messages.length - 1].id : null

		if (messagesContainer.current && prevLastMsgId !== lastMsgId)
			messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight

		setPrevMessages([...messages])
	}, [messages])

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
				{shownMessages.length > 0 ? (
					<div className={styles['messages-container']} ref={messagesContainer}>
						{shownMessages.map((item) => (
							<MessageItem
								key={item.id}
								message={item}
								onEmoji={(emoji) => onEmoji(item.id, emoji)}
								onDelete={() => onMessageDelete(item.id)}
								onEdit={() => onEdit(item.id)}
								currentUserId={currentUserId}
								viewMode={viewMode}
							/>
						))}
					</div>
				) : (
					<div className={styles['no-messages']}>No messages yet</div>
				)}

				<MessageComposer
					value={composerValue}
					editInProgress={!!editInProgress}
					onChange={onComposerChange}
					onSend={onSend}
				/>
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
