import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignUp } from '../SignUp'
import { BrowserRouter } from 'react-router-dom'
import { authApi } from '../../../api/auth'

// モックの作成
vi.mock('../../../api/auth', () => ({
  authApi: {
    signUp: vi.fn()
  }
}))

const renderSignUp = () => {
  return render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  )
}

describe('SignUp Component', () => {
  it('renders signup form', () => {
    renderSignUp()
    
    expect(screen.getByText('アカウント登録')).toBeInTheDocument()
    expect(screen.getByLabelText('名前')).toBeInTheDocument()
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument()
  })

  it('shows validation error for empty fields', async () => {
    renderSignUp()
    
    const submitButton = screen.getByRole('button', { name: '登録' })
    await userEvent.click(submitButton)

    expect(screen.getByText('名前を入力してください')).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    renderSignUp()
    
    const emailInput = screen.getByLabelText('メールアドレス')
    await userEvent.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: '登録' })
    await userEvent.click(submitButton)

    expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument()
  })

  it('shows validation error for invalid password', async () => {
    renderSignUp()
    
    const passwordInput = screen.getByLabelText('パスワード')
    await userEvent.type(passwordInput, 'short')
    
    const submitButton = screen.getByRole('button', { name: '登録' })
    await userEvent.click(submitButton)

    expect(screen.getByText('パスワードは8文字以上で入力してください')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ data: { id: 1 } })
    vi.mocked(authApi.signUp).mockImplementation(mockSignUp)

    renderSignUp()
    
    await userEvent.type(screen.getByLabelText('名前'), 'テストユーザー')
    await userEvent.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('パスワード'), 'Password123')
    
    const submitButton = screen.getByRole('button', { name: '登録' })
    await userEvent.click(submitButton)

    expect(mockSignUp).toHaveBeenCalledWith({
      name: 'テストユーザー',
      email: 'test@example.com',
      password: 'Password123'
    })
  })
}) 