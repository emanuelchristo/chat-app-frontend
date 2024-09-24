import { useState, useEffect } from 'react'

import { ModalDialog } from '../ModalDialog'

import styles from './CreateChatDialog.module.css'

type CreateChatDialogProps = {
	show: boolean
	onCancel: () => void
	onOk: (val: string) => void
}

export const CreateChatDialog = ({ show, onCancel, onOk }: CreateChatDialogProps) => {
	const [val, setVal] = useState('')

	useEffect(() => {
		if (!show) {
			setVal('')
		}
	}, [show])

	return (
		<ModalDialog
			show={show}
			primaryAction='Create'
			primaryColor='black'
			secondaryAction='Cancel'
			title='Create Chat'
			onCancel={onCancel}
			onOk={() => onOk(val)}
		>
			<input
				className={styles['chat-name-input']}
				type='text'
				placeholder='Enter name...'
				value={val}
				maxLength={20}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						onOk(val)
					}
				}}
				onChange={(e) => setVal(e.target.value)}
			/>
		</ModalDialog>
	)
}
