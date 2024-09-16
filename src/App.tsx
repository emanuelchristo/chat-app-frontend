import { ChatsPane } from './components/ChatsPane'
import { MessagesPane } from './components/MessagesPane'

import styles from './App.module.css'

export default function App() {
	return (
		<div className={styles['app']}>
			<ChatsPane />
			<MessagesPane />
		</div>
	)
}
