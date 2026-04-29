import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInput from '../../components/Chat/ChatInput';

describe('ChatInput', () => {
  it('renders the textarea', () => {
    render(<ChatInput onSend={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the send button', () => {
    render(<ChatInput onSend={vi.fn()} />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('send button is disabled when input is empty', () => {
    render(<ChatInput onSend={vi.fn()} />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('calls onSend with the message when form is submitted', async () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'How to register?');
    await userEvent.keyboard('{Enter}');
    expect(onSend).toHaveBeenCalledWith('How to register?');
  });

  it('clears input after sending', async () => {
    render(<ChatInput onSend={vi.fn()} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Test message');
    await userEvent.keyboard('{Enter}');
    expect(input).toHaveValue('');
  });

  it('does not send empty or whitespace messages', async () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    await userEvent.keyboard('{Enter}');
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables textarea and button when disabled prop is true', () => {
    render(<ChatInput onSend={vi.fn()} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });
});
