import type { Message } from '../../types'

import { useState, useEffect } from 'react'
import { useAppState, useDispatch } from '../../contexts/AppStateContext'

import { ModalDialog } from '../ModalDialog'

import styles from './EditMessageDialog.module.css'

export const EditMessageDialog = () => {
	const { messages, editMessageId } = useAppState()
	const dispatch = useDispatch()
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
			onCancel={() => {
				dispatch({ type: 'CANCEL_MSG_EDIT' })
			}}
			onOk={() => {
				dispatch({ type: 'OK_MSG_EDIT', payload: { text: text } })
			}}
		>
			<textarea
				role='edit-message-textbox'
				className={styles['textarea']}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder='Enter message...'
			></textarea>
		</ModalDialog>
	)
}
