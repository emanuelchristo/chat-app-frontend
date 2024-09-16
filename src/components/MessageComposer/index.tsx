import styles from './MessageComposer.module.css'

export const MessageComposer = () => {
	return (
		<div className={styles['message-composer']}>
			<div className={styles['text-area-wrapper']}>
				<textarea className={styles['text-area']} placeholder='Write a message...'></textarea>
				<button className={styles['send-button']}>Send</button>
			</div>
		</div>
	)
}
