import { formatChatDate } from '../../utils/format-date'

import styles from './ChatItem.module.css'

type ChatItemProps = {
	name: string
	imageUrl: string
	preview: string
	datetime: string | null
	unreadCount: number
	online: boolean
	viewMode: 'compact' | 'spacious'
	selected: boolean
	onClick: () => void
}

export const ChatItem = ({
	name,
	imageUrl,
	preview,
	datetime,
	unreadCount,
	online,
	viewMode,
	selected,
	onClick,
}: ChatItemProps) => {
	if (!preview) viewMode = 'compact'

	return (
		<div
			className={`${styles['chat-item']} ${selected ? styles['selected'] : ''}`}
			style={{ alignItems: viewMode === 'spacious' ? 'flex-start' : 'center' }}
			onClick={onClick}
		>
			<div className={styles['avatar-wrapper']}>
				<div
					className={styles['avatar']}
					style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'var(--gradient-avatar)' }}
				></div>
				{!!online && <div className={styles['online-circle']}></div>}
			</div>
			<div className={styles['text-wrapper']}>
				<div className={styles['name-wrapper']}>
					<span className={styles['name']}>{name}</span>
					{viewMode === 'spacious' && <span className={styles['time']}>{formatChatDate(datetime)}</span>}
					{viewMode === 'compact' && (
						<div className={styles['count']} style={{ visibility: unreadCount > 0 ? 'visible' : 'hidden' }}>
							{unreadCount}
						</div>
					)}
				</div>
				{viewMode === 'spacious' && preview && (
					<div className={styles['preview-wrapper']}>
						<p className={styles['preview']} title={preview}>
							{preview}
						</p>
						<div className={styles['count']} style={{ visibility: unreadCount > 0 ? 'visible' : 'hidden' }}>
							{unreadCount}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
