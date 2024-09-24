import { ModalDialog } from '../ModalDialog'

type DeleteMessageDialogProps = {
	show: boolean
	onOk: () => void
	onCancel: () => void
}

export const DeleteMessageDialog = ({ show, onOk, onCancel }: DeleteMessageDialogProps) => {
	return (
		<ModalDialog
			show={show}
			primaryAction='Delete'
			primaryColor='red'
			secondaryAction='Cancel'
			title='Delete Message'
			onCancel={onCancel}
			onOk={onOk}
		>
			<p className=' max-w-[80%] text-center m-auto'>Are you sure to delete this message?</p>
		</ModalDialog>
	)
}
