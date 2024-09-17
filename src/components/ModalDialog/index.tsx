import { ReactElement, useState } from 'react'

import styles from './ModalDialog.module.css'

type ModalDialogProps = {
	primaryAction: string
	secondaryAction: string
	primaryColor: 'black' | 'red'
	title: string
	onCancel: () => void
	onOk: () => void
	children: ReactElement
}

export const ModalDialog = ({
	primaryAction,
	secondaryAction = 'Cancel',
	primaryColor = 'black',
	title,
	onCancel,
	onOk,
	children,
}: ModalDialogProps) => {
	return (
		<div className={styles['modal-container']}>
			<div className={styles['dialog']}>
				<div className={styles['header']}>
					<span className={styles['title']}>{title}</span>
				</div>
				<div className={styles['content']}>{children}</div>
				<div className={styles['actions-wrapper']}>
					<button className={styles['secondary-action'] + ' clickable'} onClick={onCancel}>
						{secondaryAction}
					</button>
					<button
						className={styles['primary-action'] + ' clickable'}
						style={{ background: primaryColor === 'red' ? `var(--gradient-red)` : `var(--gradient-black)` }}
						onClick={onOk}
					>
						{primaryAction}
					</button>
				</div>
			</div>
		</div>
	)
}

export const CreateChatDialog = ({ onCancel, onOk }) => {
	const [val, setVal] = useState('')

	return (
		<ModalDialog
			primaryAction='Create'
			primaryColor='black'
			secondaryAction='Cancel'
			title='Create Chat'
			onCancel={onCancel}
			onOk={() => onOk(val)}
		>
			<input
				autoFocus
				className={styles['chat-name-input']}
				type='text'
				placeholder='Enter name...'
				value={val}
				onChange={(e) => setVal(e.target.value)}
			/>
		</ModalDialog>
	)
}
