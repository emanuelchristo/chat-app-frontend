import { ReactElement } from 'react'

import styles from './ModalDialog.module.css'

type ModalDialogProps = {
	show: boolean
	primaryAction: string
	secondaryAction: string
	primaryColor: 'black' | 'red'
	title: string
	onCancel: () => void
	onOk: () => void
	children: ReactElement
}

export const ModalDialog = ({
	show,
	primaryAction,
	secondaryAction = 'Cancel',
	primaryColor = 'black',
	title,
	onCancel,
	onOk,
	children,
}: ModalDialogProps) => {
	return (
		<div className={`${styles['modal-container']} ${!show ? styles['hide'] : ''}`} onClick={onCancel}>
			<div className={styles['dialog']} onClick={(e) => e.stopPropagation()}>
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
