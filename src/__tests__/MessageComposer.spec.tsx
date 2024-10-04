import { MessageComposer } from '../components/MessageComposer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('MessageComposer', () => {
	it('should not trigger send event if no text in textbox', () => {
		const sendHandlerMock = jest.fn()

		render(<MessageComposer onSend={sendHandlerMock} />)

		const button = screen.getByRole('button')
		userEvent.click(button)

		expect(sendHandlerMock).not.toHaveBeenCalled()
	})

	it('should trigger send event if some text in textbox', async () => {
		const sendHandlerMock = jest.fn()

		render(<MessageComposer onSend={sendHandlerMock} />)

		const textbox = screen.getByPlaceholderText(/write a message/i)
		const button = screen.getByRole('button')

		await userEvent.type(textbox, 'Hello world!')

		expect(textbox).toHaveValue('Hello world!')

		await userEvent.click(button)

		expect(sendHandlerMock).toHaveBeenCalledTimes(1)
		expect(textbox).toHaveValue('')
	})
})
