import { ChatItem } from '../ChatItem'
import { CreateButton, SearchBox } from '../SearchBox'

import styles from './ChatsPane.module.css'

export const ChatsPane = () => {
	return (
		<div className={styles['chats-pane']}>
			<div className={styles['chats-header']}>
				<div className={styles['chats-title-wrapper']}>
					<div className={styles['chats-icon-wrapper']}>
						<img src='/images/chat.png' alt='Chat icon' draggable='false' />
					</div>
					<h1>Chats</h1>
				</div>
			</div>

			<div className={styles['search-wrapper']}>
				<SearchBox />
				<CreateButton />
			</div>

			<div className={styles['chats-container']}>
				<ChatItem />
				<ChatItem
					name='Emanuel Christo'
					imageUrl=''
					preview='Hi how are you?'
					datetime={Date()}
					unreadCount={2}
					online={true}
					viewMode='spacious'
					selected={true}
				/>
				<ChatItem />
			</div>

			{/* <div className={styles['chats-empty']}>
				<img src='/images/chats-empty.png' alt='Chats empty icon' draggable='false' />
				<p>No chats. Create one</p>
			</div> */}

			<div className={styles['made-by']}>
				<p>
					Made 💙 with by{' '}
					<a href='https://ecris.in' target='_blank' rel='noreferrer'>
						Cris
					</a>
				</p>
			</div>
		</div>
	)
}
