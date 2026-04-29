import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatBubble from '../../components/Chat/ChatBubble';
import type { ChatMessage } from '../../types';

function makeMsg(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: 'test-1',
    role: 'user',
    content: 'Hello test',
    timestamp: new Date('2026-04-29T10:00:00'),
    ...overrides,
  };
}

describe('ChatBubble', () => {
  it('renders user message content', () => {
    render(<ChatBubble message={makeMsg({ content: 'How do I vote?' })} />);
    expect(screen.getByText('How do I vote?')).toBeInTheDocument();
  });

  it('renders assistant message content', () => {
    render(<ChatBubble message={makeMsg({ role: 'assistant', content: 'You must be 18+.' })} />);
    expect(screen.getByText('You must be 18+.')).toBeInTheDocument();
  });

  it('shows the AI avatar icon for assistant messages', () => {
    render(<ChatBubble message={makeMsg({ role: 'assistant', content: 'Hi' })} />);
    // The avatar emoji is in the DOM
    expect(screen.getByLabelText(/Election Navigator/i)).toBeInTheDocument();
  });

  it('has correct ARIA label for user message', () => {
    render(<ChatBubble message={makeMsg({ role: 'user', content: 'My question' })} />);
    expect(screen.getByLabelText(/You: My question/i)).toBeInTheDocument();
  });

  it('has correct ARIA label for assistant message', () => {
    render(<ChatBubble message={makeMsg({ role: 'assistant', content: 'My answer' })} />);
    expect(screen.getByLabelText(/Election Navigator: My answer/i)).toBeInTheDocument();
  });
});
