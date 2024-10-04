import App from '../App'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Initial screen', () => {
	it('should not show any chats or messages', () => {
		render(<App />)

		const chatsPane = screen.getByText(/no chats. create one/i)
		const messagesPane = screen.getByText(/select a chat to get started/i)

		expect(chatsPane).toBeInTheDocument()
		expect(messagesPane).toBeInTheDocument()
	})

	it('should have spacious as default view mode and change when clicked', async () => {
		render(<App />)

		const spaciousButton = screen.getByRole('button', {
			name: /spacious/i,
		})
		const compactButton = screen.getByRole('button', {
			name: /compact/i,
		})

		expect(spaciousButton.className).toMatch(/selected/i)
		expect(compactButton.className).not.toMatch(/selected/i)

		await userEvent.click(compactButton)

		expect(spaciousButton.className).not.toMatch(/selected/i)
		expect(compactButton.className).toMatch(/selected/i)

		await userEvent.click(spaciousButton)

		expect(spaciousButton.className).toMatch(/selected/i)
		expect(compactButton.className).not.toMatch(/selected/i)
	})
})

describe('Chat creation, deletion, selection', () => {
	it('should create new chat and select it to show no messages', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		const createButton = screen.getByRole('button', {
			name: /create/i,
		})

		// const createChatDialog = screen.getByText('Delete Chat').closest('div')?.parentElement
		// const cancelCreateChatButton = within(createChatDialog as HTMLElement).getByRole('button', { name: /cancel/i })

		// // Cancelling
		// await userEvent.click(cancelCreateChatButton)

		await userEvent.type(chatNameInput, 'Test Chat #1')
		await userEvent.click(createButton)

		const emptyMessages = await screen.findByText(/no messages yet/i)
		expect(emptyMessages).toBeInTheDocument()

		const chatNames = await screen.findAllByText('Test Chat #1')
		expect(chatNames.length).toBe(2)
	})

	it('should create new chat on ENTER', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')

		const emptyMessages = await screen.findByText(/no messages yet/i)
		expect(emptyMessages).toBeInTheDocument()

		const chatNames = await screen.findAllByText('Test Chat #1')
		expect(chatNames.length).toBe(2)
	})

	it('should delete chat', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		const createButton = screen.getByRole('button', {
			name: /create/i,
		})

		await userEvent.type(chatNameInput, 'Test Chat #1')
		await userEvent.click(createButton)

		const deleteChatButton = await screen.findByTitle('Delete Chat')
		await userEvent.click(deleteChatButton)

		const deleteChatDialog = screen.getByText('Delete Chat').closest('div')?.parentElement
		const deleteConfirmButton = within(deleteChatDialog as HTMLElement).getByRole('button', { name: /delete/i })
		await userEvent.click(deleteConfirmButton)

		const chatNamesAfterDelete = screen.queryAllByText('Test Chat #1')
		expect(chatNamesAfterDelete.length).toBe(0)
	})

	it('should cancel delete chat', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		const createButton = screen.getByRole('button', {
			name: /create/i,
		})

		await userEvent.type(chatNameInput, 'Test Chat #1')
		await userEvent.click(createButton)

		const deleteChatButton = await screen.findByTitle('Delete Chat')
		await userEvent.click(deleteChatButton)

		const deleteChatDialog = screen.getByText('Delete Chat').closest('div')?.parentElement
		const deleteCancelButton = within(deleteChatDialog as HTMLElement).getByRole('button', { name: /cancel/i })
		await userEvent.click(deleteCancelButton)

		const chatNamesAfterDelete = within(screen.getByTestId('chats-container')).queryAllByText('Test Chat #1')
		expect(chatNamesAfterDelete.length).toBe(1)
	})

	it('should cancel creating a new chat', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)

		const createChatDialog = screen.getByText('Create Chat').closest('div')?.parentElement
		const cancelButton = within(createChatDialog as HTMLElement).getByRole('button', { name: /cancel/i })

		await userEvent.type(chatNameInput, 'Test Chat #1')
		await userEvent.click(cancelButton)

		const chatNames = await screen.queryByText('Test Chat #1')
		expect(chatNames).toBe(null)
	})

	it('should create 2 new chats and select it', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		await userEvent.click(addChatButton as Element)

		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')
		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #2{enter}')

		const chatItem1 = await screen.findByText('Test Chat #1')
		await userEvent.click(chatItem1)

		const chatNames = await screen.findAllByText('Test Chat #1')
		expect(chatNames.length).toBe(2)
	})
})

describe('Chats pane', () => {
	it('should create 2 chats and search', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		const searchInput = screen.getByPlaceholderText(/search chats/i)

		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')
		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #2{enter}')

		const chatsContainer = screen.getByTestId('chats-container')

		const chatItems = await within(chatsContainer).findAllByText(/test chat/i)
		expect(chatItems.length).toBe(2)

		await userEvent.type(searchInput, 'chat')

		const chatItems2 = await within(chatsContainer).findAllByText(/test chat/i)
		expect(chatItems2.length).toBe(2)

		await userEvent.clear(searchInput)
		await userEvent.type(searchInput, '#1')

		const chatItems3 = await within(chatsContainer).findAllByText(/test chat/i)
		expect(chatItems3.length).toBe(1)
	})

	it('should create 2 chats and search and clear search', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		const chatNameInput = screen.getByPlaceholderText(/enter name/i)
		const searchInput = screen.getByPlaceholderText(/search chats/i)

		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')
		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #2{enter}')

		const chatsContainer = screen.getByTestId('chats-container')

		await userEvent.type(searchInput, '#1')

		const chatItems = await within(chatsContainer).findAllByText(/test chat/i)
		expect(chatItems.length).toBe(1)

		const clearButton = screen.getByTestId('clear-search')
		await userEvent.click(clearButton)

		const chatItems2 = await within(chatsContainer).findAllByText(/test chat/i)
		expect(chatItems2.length).toBe(2)
	})
})

describe('Messages', () => {
	it('should create a new chat and send a message', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		const chatNameInput = screen.getByPlaceholderText(/enter name/i)

		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')

		const textbox = await screen.findByPlaceholderText(/write a message/i)
		const sendButton = screen.getByRole('button', { name: /send/i })

		await userEvent.type(textbox, 'Hello world!')
		await userEvent.click(sendButton)

		const messagesContainer = screen.getByTestId('messages-container')

		const messageItem = await within(messagesContainer).findByText('Hello world!')
		expect(messageItem).toBeInTheDocument()
	})

	it('should react with emoji on a message', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		const chatNameInput = screen.getByPlaceholderText(/enter name/i)

		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')

		const textbox = await screen.findByPlaceholderText(/write a message/i)
		const sendButton = screen.getByRole('button', { name: /send/i })

		await userEvent.type(textbox, 'Hello world!')
		await userEvent.click(sendButton)

		const messagesContainer = screen.getByTestId('messages-container')

		const messageItem = await within(messagesContainer).findByText('Hello world!')

		const bubble = messageItem.closest('div')?.parentElement as HTMLElement

		const likeEmoji = within(bubble).getByText('👍')
		await userEvent.click(likeEmoji)

		const likes = await within(bubble).findAllByText('👍')
		expect(likes.length).toBe(2)

		// Unreact
		await userEvent.click(likes[1])

		const likesNew = await within(bubble).findAllByText('👍')
		expect(likesNew.length).toBe(1)
	})

	it('should show whole message on pressing "more"', async () => {
		render(<App />)

		const addChatButton = screen.getByAltText('+').closest('button')
		const chatNameInput = screen.getByPlaceholderText(/enter name/i)

		await userEvent.click(addChatButton as Element)
		await userEvent.type(chatNameInput, 'Test Chat #1{enter}')

		const textbox = await screen.findByPlaceholderText(/write a message/i)
		const sendButton = screen.getByRole('button', { name: /send/i })

		const longMessage =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

		await userEvent.type(textbox, longMessage)
		await userEvent.click(sendButton)

		const messagesContainer = screen.getByTestId('messages-container')
		const moreButton = screen.getByText('...more')

		expect(within(messagesContainer).queryByText(/laborum/i)).toBe(null)

		await userEvent.click(moreButton)

		expect(within(messagesContainer).queryByText(/laborum/i)).not.toBe(null)
	})

	// it('should show tooltip on hovering over long messages', async () => {
	// 	render(<App />)

	// 	const addChatButton = screen.getByAltText('+').closest('button')
	// 	const chatNameInput = screen.getByPlaceholderText(/enter name/i)

	// 	await userEvent.click(addChatButton as Element)
	// 	await userEvent.type(chatNameInput, 'Test Chat #1{enter}')

	// 	const textbox = await screen.findByPlaceholderText(/write a message/i)
	// 	const sendButton = screen.getByRole('button', { name: /send/i })

	// 	const longMessage =
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

	// 	await userEvent.type(textbox, longMessage)
	// 	await userEvent.click(sendButton)

	// 	const chatsContainer = screen.getByTestId('chats-container')

	// 	const lastMessage = await within(chatsContainer).findByText(/lorem ipsum/i)
	// 	const tooltip = screen.getByTestId('tooltip')

	// 	expect(tooltip.className).not.toMatch('visible')

	// 	fireEvent.mouseEnter(lastMessage)

	// 	const tooltip2 = await screen.findByTestId('tooltip')
	// 	expect(tooltip2.className).toMatch(/visible/i)

	// 	fireEvent.mouseLeave(lastMessage)

	// 	expect(tooltip.className).not.toMatch('visible')
	// })
})

// describe('Local storage persistence', () => {
// 	// let's make a mock fridge (storage) for all our tests to use
// 	let mockFridge = {}

// 	beforeAll(() => {
// 		global.Storage.prototype.setItem = jest.fn((key, value) => {
// 			mockFridge[key] = value
// 		})
// 		global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key])
// 	})

// 	beforeEach(() => {
// 		// make sure the fridge starts out empty for each test
// 		mockFridge = { chatData: localStorageChatData }
// 	})

// 	afterAll(() => {
// 		// return our mocks to their original values
// 		// 🚨 THIS IS VERY IMPORTANT to avoid polluting future tests!
// 		// global.Storage.prototype.setItem.mockReset()
// 		// global.Storage.prototype.getItem.mockReset()
// 	})

// 	it('should load and display data from localStorage', async () => {
// 		render(<App />)

// 		const chatItem1 = await screen.findByText('Test Chat #1')
// 		const chatItem2 = screen.getByText('Test Chat #2')
// 		const messagesPane = screen.getByText(/select a chat to get started/i)

// 		expect(chatItem1).toBeInTheDocument()
// 		expect(chatItem2).toBeInTheDocument()
// 		expect(messagesPane).toBeInTheDocument()
// 	})
// })
