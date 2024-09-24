import { useState } from 'react'

import styles from './MessageComposer.module.css'

export const MessageComposer = ({ onSend }: { onSend: (text: string) => void }) => {
	const [text, setText] = useState('')

	const MAX_ROWS = 4

	return (
		<div className={styles['message-composer']}>
			<div className={styles['text-area-wrapper']}>
				<textarea
					className={styles['text-area']}
					placeholder='Write a message...'
					rows={Math.min(text.split('\n').length, MAX_ROWS)}
					onChange={(e) => {
						setText(e.target.value)
					}}
					value={text}
				></textarea>
				<button
					className={styles['send-button']}
					onClick={() => {
						if (text) onSend(text)
						setText('')
					}}
				>
					Send
				</button>
			</div>
		</div>
	)
}
