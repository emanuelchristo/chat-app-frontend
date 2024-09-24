import { ModalDialog } from '../ModalDialog'

type DeleteChatDialogProps = {
	show: boolean
	onOk: () => void
	onCancel: () => void
}

export const DeleteChatDialog = ({ show, onOk, onCancel }: DeleteChatDialogProps) => {
	return (
		<ModalDialog
			show={show}
			primaryAction='Delete'
			primaryColor='red'
			secondaryAction='Cancel'
			title='Delete Chat'
			onCancel={onCancel}
			onOk={onOk}
		>
			<p className=' max-w-[80%] text-center m-auto'>Are you sure to delete this chat and all its messages?</p>
		</ModalDialog>
	)
}
