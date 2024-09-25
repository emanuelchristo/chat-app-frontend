import { useState, useEffect } from 'react'
import { useDispatch, useAppState } from '../../contexts/AppStateContext'

import { ModalDialog } from '../ModalDialog'

import styles from './CreateChatDialog.module.css'

export const CreateChatDialog = () => {
	const dispatch = useDispatch()
	const { showChatCreate } = useAppState()
	const [chatName, setChatName] = useState('')

	useEffect(() => {
		if (!showChatCreate) {
			setChatName('')
		}
	}, [showChatCreate])

	function handleCancel() {
		dispatch({ type: 'CANCEL_CHAT_CREATE' })
	}

	function handleOk() {
		dispatch({ type: 'OK_CHAT_CREATE', payload: { chatName: chatName } })
	}

	return (
		<ModalDialog
			show={showChatCreate}
			primaryAction='Create'
			primaryColor='black'
			secondaryAction='Cancel'
			title='Create Chat'
			onCancel={handleCancel}
			onOk={handleOk}
		>
			<input
				id='create'
				className={styles['chat-name-input']}
				type='text'
				placeholder='Enter name...'
				value={chatName}
				maxLength={20}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						handleOk()
					}
				}}
				onChange={(e) => setChatName(e.target.value)}
			/>
		</ModalDialog>
	)
}
