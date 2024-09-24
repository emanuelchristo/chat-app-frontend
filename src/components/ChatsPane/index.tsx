import type { Chat, User, Message, ViewMode as ViewModeType, Action } from '../../types'
import type { Dispatch } from 'react'

import { search } from 'fast-fuzzy'
import { useState, memo, useMemo, useCallback } from 'react'

import { ChatItem } from '../ChatItem'
import { ViewMode } from '../ViewMode'
import { SearchBox } from '../SearchBox'

import styles from './ChatsPane.module.css'

type ChatsPaneProps = {
	chats: Chat[]
	messages: Message[]
	currentUserId: string
	selectedChatId: string | null
	viewMode: ViewModeType
	dispatch: Dispatch<Action>
}

export const ChatsPane = memo(
	({ chats, messages, currentUserId, selectedChatId, viewMode, dispatch }: ChatsPaneProps) => {
		const [chatSearchVal, setChatSearchVal] = useState('')

		const searchedChats = useMemo(() => {
			if (!chatSearchVal) return chats

			return search(chatSearchVal, chats, {
				keySelector: (obj) => obj.users.find((item) => item.id !== currentUserId)!.name,
			})
		}, [chats, chatSearchVal, currentUserId])

		const handleChatSelect = useCallback((chatId: string) => dispatch({ type: 'CHAT_SELECT', payload: { chatId } }), [])

		return (
			<div className={styles['chats-pane']}>
				<div className={styles['chats-header']}>
					<div className={styles['chats-title-wrapper']}>
						<div className={styles['chats-icon-wrapper']}>
							<img src='/images/chat.png' alt='Chat icon' draggable='false' />
						</div>
						<h1>Chats</h1>
					</div>
					<ViewMode
						viewMode={viewMode}
						onViewModeChange={(val) => dispatch({ type: 'VIEW_MODE', payload: { viewMode: val } })}
					/>
				</div>

				<div className={styles['search-wrapper']}>
					<SearchBox val={chatSearchVal} onChange={setChatSearchVal} />

					<button className={styles['create-button'] + ' clickable'} onClick={() => dispatch({ type: 'CHAT_CREATE' })}>
						<img src='/images/add.svg' alt='+' />
					</button>
				</div>

				{chats.length > 0 ? (
					<div className={styles['chats-container']}>
						{searchedChats.map((chat) => {
							const chatUser = chat.users.find((item) => item.id !== currentUserId) as User
							const lastMessage = [...messages].reverse().find((item) => item.chatId === chat.id)
							const unreadCount = messages.filter((item) => item.chatId === chat.id && item.unread).length
							return (
								<ChatItem
									key={chat.id}
									chatId={chat.id}
									name={chatUser.name}
									imageUrl={chatUser.imgUrl}
									preview={lastMessage?.text ?? ''}
									datetime={lastMessage?.datetime ?? null}
									unreadCount={unreadCount}
									online={chatUser.isOnline}
									viewMode={viewMode}
									selected={selectedChatId === chat.id}
									onClick={handleChatSelect}
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
)
