import styles from './MessageComposer.module.css'

export const MessageComposer = ({
	value,
	onChange,
	onSend,
	editInProgress,
}: {
	value: string
	onChange: (val: string) => void
	onSend: () => void
	editInProgress: boolean
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
					{editInProgress ? 'Save Edit' : 'Send'}
				</button>
			</div>
		</div>
	)
}
