import type { Message } from '../../types'

import { useState, useEffect } from 'react'

import { ModalDialog } from '../ModalDialog'

import styles from './EditMessageDialog.module.css'

type EditMessageDialogProps = {
	messages: Message[]
	editMessageId: string
	onCancel: () => void
	onOk: (val: string) => void
}

export const EditMessageDialog = ({ messages, editMessageId, onCancel, onOk }: EditMessageDialogProps) => {
	const [text, setText] = useState('')

	useEffect(() => {
		if (editMessageId) {
			const msg = messages.find((item) => item.id === editMessageId) as Message
			setText(msg.text)
		} else {
			setText('')
		}
	}, [messages, editMessageId])

	return (
		<ModalDialog
			show={!!editMessageId}
			primaryAction='Save Edit'
			primaryColor='black'
			secondaryAction='Cancel'
			title='Edit Message'
			onCancel={onCancel}
			onOk={() => {
				onOk(text)
			}}
		>
			<textarea
				className={styles['textarea']}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder='Enter message...'
			></textarea>
		</ModalDialog>
	)
}
