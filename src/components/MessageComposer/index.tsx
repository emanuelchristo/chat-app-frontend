import { useRef, useState } from 'react'

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
	const [rows, setRows] = useState(1)
	const MAX_ROWS = 4

	return (
		<div className={styles['message-composer']}>
			<div className={styles['text-area-wrapper']}>
				<textarea
					className={styles['text-area']}
					placeholder='Write a message...'
					rows={rows}
					onKeyDown={(e) => {
						if ((e.shiftKey === false) & (e.key === 'Enter')) {
							onSend()
						}
					}}
					onChange={(e) => {
						onChange(e.target.value)
						const nRows = e.target.value.split('\n').length
						setRows(Math.min(nRows, MAX_ROWS))
					}}
					value={value}
				></textarea>
				<button className={styles['send-button']} onClick={onSend}>
					{editInProgress ? 'Save Edit' : 'Send'}
				</button>
			</div>
		</div>
	)
}
