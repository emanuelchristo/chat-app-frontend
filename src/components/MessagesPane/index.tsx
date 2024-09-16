import { MessageComposer } from '../MessageComposer'
import { MessagesHeader } from '../MessagesHeader'

import styles from './MessagesPane.module.css'

export const MessagesPane = () => {
	// return <MessagesPaneEmpty />
	return (
		<div className={styles['messages-pane']}>
			<MessagesHeader />
			<div className='flex-1'></div>
			<MessageComposer />
		</div>
	)
}

const MessagesPaneEmpty = () => {
	return (
		<div className={styles['messages-pane-empty']}>
			<div className={styles['messages-pane-empty-icon']}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<p>Select a chat to get started</p>
		</div>
	)
}
