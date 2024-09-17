import styles from './MessageComposer.module.css'

export const MessageComposer = ({
	value,
	onChange,
	onSend,
}: {
	value: string
	onChange: (val: string) => void
	onSend: () => void
}) => {
	return (
		<div className={styles['message-composer']}>
			<div className={styles['text-area-wrapper']}>
				<textarea
					className={styles['text-area']}
					placeholder='Write a message...'
					onChange={(e) => onChange(e.target.value)}
					value={value}
				></textarea>
				<button className={styles['send-button']} onClick={onSend}>
					Send
				</button>
			</div>
		</div>
	)
}
