import { useAppState, useDispatch } from '../../contexts/AppStateContext'

import { ModalDialog } from '../ModalDialog'

export const DeleteMessageDialog = () => {
	const { deleteMessageId } = useAppState()
	const dispatch = useDispatch()

	return (
		<ModalDialog
			show={!!deleteMessageId}
			primaryAction='Delete'
			primaryColor='red'
			secondaryAction='Cancel'
			title='Delete Message'
			onCancel={() => {
				dispatch({ type: 'CANCEL_MSG_DELETE' })
			}}
			onOk={() => {
				dispatch({ type: 'OK_MSG_DELETE' })
			}}
		>
			<p className=' max-w-[80%] text-center m-auto'>Are you sure to delete this message?</p>
		</ModalDialog>
	)
}
