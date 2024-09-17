import type { Message } from '../../types'
import { formatDate } from '../../utils/format-date'

import styles from './MessageItem.module.css'

type MessageItemProps = {
	message: Message
	currentUserId: string
	onEmoji: (emoji: string) => void
	onEdit: () => void
	onDelete: () => void
}

export const MessageItem = ({ message, currentUserId, onEmoji, onEdit, onDelete }: MessageItemProps) => {
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

	return (
		<div className={`${styles['message-item-container']} ${self ? styles['self'] : ''}`}>
			<div className={styles['message-item']}>
				<div className={styles['avatar']}></div>
				<div className={styles['bubble-wrapper']}>
					<span className={styles['datetime']}>{formatDate(message.datetime)}</span>
					<div className={styles['bubble']}>
						<ReactionsMenu onEmoji={onEmoji} onEdit={onEdit} onDelete={onDelete} showEdit={isSelf} />
						{message.text}
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
					<span key={item} onClick={() => onEmoji(item)}>
						{item}
					</span>
				))}
			</div>
			<div className={styles['separator']}></div>
			<div className={styles['actions-wrapper']}>
				{showEdit && (
					<svg
						width='12'
						height='12'
						className={styles['action-icon']}
						viewBox='0 0 12 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						onClick={() => onEdit()}
					>
						<mask id='mask0_4_480' maskUnits='userSpaceOnUse' x='0' y='0' width='12' height='12'>
							<rect width='12' height='12' fill='#D9D9D9' />
						</mask>
						<g mask='url(#mask0_4_480)'>
							<path
								d='M2.50049 9.50006H3.13124L8.24949 4.38181L7.61874 3.75106L2.50049 8.86931V9.50006ZM2.20249 10.2501C2.07441 10.2501 1.96707 10.2067 1.88049 10.1201C1.79382 10.0335 1.75049 9.92614 1.75049 9.79806V8.93181C1.75049 8.8099 1.7739 8.69369 1.82074 8.58319C1.86749 8.47269 1.93191 8.3764 2.01399 8.29431L8.34574 1.96544C8.42132 1.89677 8.50478 1.84373 8.59611 1.80631C8.68753 1.76881 8.78336 1.75006 8.88361 1.75006C8.98386 1.75006 9.08095 1.76785 9.17486 1.80344C9.26886 1.83902 9.35207 1.8956 9.42449 1.97319L10.0351 2.59144C10.1127 2.66385 10.168 2.74719 10.201 2.84144C10.234 2.93569 10.2505 3.02994 10.2505 3.12419C10.2505 3.22477 10.2333 3.32073 10.199 3.41206C10.1647 3.50348 10.11 3.58698 10.0351 3.66256L3.70624 9.98656C3.62416 10.0686 3.52786 10.1331 3.41736 10.1798C3.30686 10.2266 3.19066 10.2501 3.06874 10.2501H2.20249ZM7.92861 4.07194L7.61874 3.75106L8.24949 4.38181L7.92861 4.07194Z'
								fill='black'
							/>
						</g>
					</svg>
				)}
				<svg
					width='12'
					height='12'
					className={styles['action-icon']}
					viewBox='0 0 12 12'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={() => onDelete()}
				>
					<mask id='mask0_4_483' maskUnits='userSpaceOnUse' x='0' y='0' width='12' height='12'>
						<rect width='12' height='12' fill='#D9D9D9' />
					</mask>
					<g mask='url(#mask0_4_483)'>
						<path
							d='M3.65387 10.25C3.40529 10.25 3.1925 10.1615 3.0155 9.98449C2.8385 9.80749 2.75 9.5947 2.75 9.34611V2.99999H2.625C2.51875 2.99999 2.42971 2.96403 2.35788 2.89211C2.28596 2.8202 2.25 2.73111 2.25 2.62486C2.25 2.51853 2.28596 2.42949 2.35788 2.35774C2.42971 2.28591 2.51875 2.24999 2.625 2.24999H4.5C4.5 2.12757 4.54313 2.02324 4.62938 1.93699C4.71554 1.85082 4.81983 1.80774 4.94225 1.80774H7.05775C7.18017 1.80774 7.28446 1.85082 7.37063 1.93699C7.45688 2.02324 7.5 2.12757 7.5 2.24999H9.375C9.48125 2.24999 9.57029 2.28595 9.64213 2.35786C9.71404 2.42978 9.75 2.51886 9.75 2.62511C9.75 2.73145 9.71404 2.82049 9.64213 2.89224C9.57029 2.96407 9.48125 2.99999 9.375 2.99999H9.25V9.34611C9.25 9.5947 9.1615 9.80749 8.9845 9.98449C8.8075 10.1615 8.59471 10.25 8.34613 10.25H3.65387ZM8.5 2.99999H3.5V9.34611C3.5 9.39103 3.51442 9.42791 3.54325 9.45674C3.57208 9.48557 3.60896 9.49999 3.65387 9.49999H8.34613C8.39104 9.49999 8.42792 9.48557 8.45675 9.45674C8.48558 9.42791 8.5 9.39103 8.5 9.34611V2.99999ZM5.07713 8.49999C5.18338 8.49999 5.27242 8.46407 5.34425 8.39224C5.416 8.32032 5.45187 8.23124 5.45187 8.12499V4.37499C5.45187 4.26874 5.41592 4.17966 5.344 4.10774C5.27217 4.03591 5.18308 3.99999 5.07675 3.99999C4.9705 3.99999 4.88146 4.03591 4.80962 4.10774C4.73787 4.17966 4.702 4.26874 4.702 4.37499V8.12499C4.702 8.23124 4.73792 8.32032 4.80975 8.39224C4.88167 8.46407 4.97079 8.49999 5.07713 8.49999ZM6.92325 8.49999C7.0295 8.49999 7.11854 8.46407 7.19037 8.39224C7.26212 8.32032 7.298 8.23124 7.298 8.12499V4.37499C7.298 4.26874 7.26208 4.17966 7.19025 4.10774C7.11833 4.03591 7.02921 3.99999 6.92288 3.99999C6.81663 3.99999 6.72758 4.03591 6.65575 4.10774C6.584 4.17966 6.54812 4.26874 6.54812 4.37499V8.12499C6.54812 8.23124 6.58408 8.32032 6.656 8.39224C6.72783 8.46407 6.81692 8.49999 6.92325 8.49999Z'
							fill='black'
						/>
					</g>
				</svg>
			</div>
		</div>
	)
}
