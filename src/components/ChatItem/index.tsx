import { memo, useState, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { formatChatDate } from '../../utils/format-date'

import styles from './ChatItem.module.css'

type ChatItemProps = {
	chatId: string
	name: string
	imageUrl: string
	preview: string
	datetime: string | null
	unreadCount: number
	online: boolean
	viewMode: 'compact' | 'spacious'
	selected: boolean
	onClick: (chatId: string) => void
}

export const ChatItem = memo(
	({ chatId, name, imageUrl, preview, datetime, unreadCount, online, viewMode, selected, onClick }: ChatItemProps) => {
		if (!preview) viewMode = 'compact'

		const previewWrapper = useRef<HTMLDivElement>(null)
		const tooltip = useRef<HTMLDivElement>(null)
		const previewEl = useRef<HTMLParagraphElement>(null)
		const [showTooltip, setShowTooltip] = useState(false)

		useLayoutEffect(() => {
			if (!previewWrapper.current || !tooltip.current || !previewEl.current || !showTooltip) return

			const isTextOverflowing = previewEl.current.offsetHeight < previewEl.current.scrollHeight
			if (!isTextOverflowing) {
				setShowTooltip(false)
				return
			}

			const rectPreview = previewWrapper.current.getBoundingClientRect()
			const rectTooltip = tooltip.current.getBoundingClientRect()

			const isOutside = rectPreview.top + rectTooltip.height > window.innerHeight

			console.log('rectPreview', rectPreview, 'rectTooltip', rectTooltip)

			tooltip.current.style.top = isOutside ? 'unset' : `${rectPreview.top + 20}px`
			tooltip.current.style.left = `${rectPreview.left + 12}px`
			tooltip.current.style.right = 'unset'
			tooltip.current.style.bottom = isOutside ? `${window.innerHeight - rectPreview.top - 20}px` : 'unset'
		}, [showTooltip])

		function formatPreview(text: string) {
			return text.replace(/\n/g, '<br>')
		}

		return (
			<div
				className={`${styles['chat-item']} ${selected ? styles['selected'] : ''}`}
				style={{ alignItems: viewMode === 'spacious' ? 'flex-start' : 'center' }}
				onClick={() => onClick(chatId)}
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
						<div
							className={styles['preview-wrapper']}
							ref={previewWrapper}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
						>
							<p
								className={styles['preview']}
								ref={previewEl}
								dangerouslySetInnerHTML={{ __html: formatPreview(preview) }}
							></p>
							{createPortal(
								<div
									ref={tooltip}
									className={`${styles['tooltip']} ${showTooltip ? styles['tooltip-visible'] : ''}`}
									dangerouslySetInnerHTML={{ __html: formatPreview(preview) }}
								></div>,
								document.body
							)}
							<div className={styles['count']} style={{ visibility: unreadCount > 0 ? 'visible' : 'hidden' }}>
								{unreadCount}
							</div>
						</div>
					)}
				</div>
			</div>
		)
	}
)
