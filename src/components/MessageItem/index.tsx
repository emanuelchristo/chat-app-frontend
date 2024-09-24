import type { Message } from '../../types'
import { formatMessageDate } from '../../utils/format-date'

import styles from './MessageItem.module.css'

type MessageItemProps = {
	message: Message
	currentUserId: string
	onEmoji: (emoji: string) => void
	onEdit: () => void
	onDelete: () => void
	viewMode: 'compact' | 'spacious'
}

const MessageItem = ({ message, currentUserId, onEmoji, onEdit, onDelete, viewMode }: MessageItemProps) => {
	// Function that reactions and count similar ones
	function groupReactions(reactions: { emoji: string; userId: string }[], currentUserId: string) {
		const table: { [key: string]: { isSelf: boolean; count: number } } = {}

		for (const item of reactions) {
			if (table[item.emoji] === undefined) {
				table[item.emoji] = { count: 1, isSelf: item.userId === currentUserId }
			} else {
				table[item.emoji].count += 1
				table[item.emoji].isSelf = table[item.emoji].isSelf || item.userId === currentUserId
			}
		}

		return Object.keys(table).map((key) => {
			return { emoji: key, count: table[key].count, isSelf: table[key].isSelf }
		})
	}

	const isSelf = message.sentUser.id === currentUserId
	const groupedReactions = groupReactions(message.reactions, currentUserId)

	function formatText(text: string) {
		return text.replace(/\n/g, '<br>')
	}

	return (
		<div className={`${styles['message-item-container']} ${self ? styles['self'] : ''}`}>
			<div className={styles['message-item']}>
				<div className={styles['avatar']}></div>
				<div className={styles['bubble-wrapper']}>
					{viewMode === 'spacious' && <span className={styles['datetime']}>{formatMessageDate(message.datetime)}</span>}
					<div className={styles['bubble']}>
						<ReactionsMenu onEmoji={onEmoji} onEdit={onEdit} onDelete={onDelete} showEdit={isSelf} />
						<span dangerouslySetInnerHTML={{ __html: formatText(message.text) }}></span>
						{groupReactions.length > 0 && (
							<div className={styles['applied-reactions-wrapper']}>
								{groupedReactions.map((item) => (
									<ReactionItem
										key={item.emoji}
										emoji={item.emoji}
										count={item.count}
										isSelf={item.isSelf}
										onClick={() => {
											if (item.isSelf) {
												onEmoji(item.emoji)
											}
										}}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessageItem

type ReactionItemProps = {
	emoji: string
	count: number
	isSelf: boolean
	onClick: () => void
}

const ReactionItem = ({ emoji, count, isSelf, onClick }: ReactionItemProps) => {
	return (
		<div className={`${styles['reaction-item']} ${isSelf ? styles['reaction-item-self'] : ''}`} onClick={onClick}>
			<span className={styles['reaction-item-emoji']}>{emoji}</span>
			<span className={styles['reaction-item-count']}>{count}</span>
		</div>
	)
}

type ReactionMenuProps = {
	onEmoji: (emoji: string) => void
	onEdit: () => void
	onDelete: () => void
	showEdit: boolean
}

const ReactionsMenu = ({ onEmoji, onEdit, onDelete, showEdit }: ReactionMenuProps) => {
	const emojis = ['👍', '🩷', '🔥', '😂', '😮']

	return (
		<div className={styles['reactions-wrapper']}>
			<div className={styles['emojis-wrapper']}>
				{emojis.map((item) => (
					<span key={item} className='clickable' onClick={() => onEmoji(item)}>
						{item}
					</span>
				))}
			</div>
			<div className={styles['separator']}></div>
			<div className={styles['actions-wrapper']}>
				{showEdit && <img src='/images/edit.svg' className={styles['action-icon']} onClick={onEdit} />}
				<img src='/images/delete.svg' className={styles['action-icon']} onClick={onDelete} />
			</div>
		</div>
	)
}
