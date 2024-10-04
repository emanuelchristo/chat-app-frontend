import type { Message } from '../../types'

import { useRef, useEffect, useState, useMemo, memo, lazy, Suspense } from 'react'
import { useAppState, useDispatch } from '../../contexts/AppStateContext'

import { MessageComposer } from '../MessageComposer'
import { MessagesHeader } from '../MessagesHeader'
const MessageItem = lazy(() => import('../MessageItem'))

import styles from './MessagesPane.module.css'

export const MessagesPane = memo(() => {
	const dispatch = useDispatch()
	const { chats, messages, currentUser, selectedChatId, viewMode } = useAppState()

	const currentUserId = currentUser.id
	const currentChat = chats.find((item) => item.id === selectedChatId)
	const currentChatUser = currentChat?.users.find((item) => item.id !== currentUserId)

	const shownMessages = useMemo(
		() => messages.filter((item) => item.chatId === selectedChatId),
		[messages, selectedChatId]
	)

	const [prevMessages, setPrevMessages] = useState<Message[]>([])
	const messagesContainer = useRef<HTMLDivElement>(null)

	// Checking if there is a different last message, if yes scrolling to bottom
	useEffect(() => {
		const prevLastMsgId = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1].id : null
		const lastMsgId = messages.length > 0 ? messages[messages.length - 1].id : null

		if (messagesContainer.current && prevLastMsgId !== lastMsgId) {
			messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
		}

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
					onChatDelete={() => dispatch({ type: 'CHAT_DELETE' })}
				/>
				{shownMessages.length > 0 ? (
					<div className={styles['messages-container']} ref={messagesContainer} data-testid='messages-container'>
						{shownMessages.map((item) => (
							<Suspense fallback={<div>Loading...</div>} key={item.id}>
								<MessageItem
									key={item.id}
									message={item}
									onEmoji={(emoji) => {
										dispatch({ type: 'EMOJI', payload: { messageId: item.id, emoji: emoji } })
									}}
									onDelete={() => dispatch({ type: 'MSG_DELETE', payload: { messageId: item.id } })}
									onEdit={() => dispatch({ type: 'MSG_EDIT', payload: { messageId: item.id } })}
									currentUserId={currentUserId}
									viewMode={viewMode}
								/>
							</Suspense>
						))}
					</div>
				) : (
					<div className={styles['no-messages']}>No messages yet</div>
				)}

				<MessageComposer onSend={(text) => dispatch({ type: 'MSG_SEND', payload: { text: text } })} />
			</div>
		)
})

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
