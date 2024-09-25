import { useAppState, useDispatch } from '../../contexts/AppStateContext'

import { ModalDialog } from '../ModalDialog'

export const DeleteChatDialog = () => {
	const { showChatDelete } = useAppState()
	const dispatch = useDispatch()

	return (
		<ModalDialog
			show={showChatDelete}
			primaryAction='Delete'
			primaryColor='red'
			secondaryAction='Cancel'
			title='Delete Chat'
			onCancel={() => dispatch({ type: 'CANCEL_CHAT_DELETE' })}
			onOk={() => dispatch({ type: 'OK_CHAT_DELETE' })}
		>
			<p className=' max-w-[80%] text-center m-auto'>Are you sure to delete this chat and all its messages?</p>
		</ModalDialog>
	)
}
