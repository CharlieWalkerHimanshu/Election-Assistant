import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('renders the hero headline', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Navigate Your Vote/i);
  });

  it('renders "Start Voting Guide" CTA button', () => {
    renderHomePage();
    expect(screen.getByRole('button', { name: /start voting guide/i })).toBeInTheDocument();
  });

  it('renders "Ask AI Assistant" CTA button', () => {
    renderHomePage();
    expect(screen.getByRole('button', { name: /ask ai assistant/i })).toBeInTheDocument();
  });

  it('renders all 3 feature cards', () => {
    renderHomePage();
    expect(screen.getByText('Guided Voting Flow')).toBeInTheDocument();
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('renders the stats strip with 3 stats', () => {
    renderHomePage();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders the Get Started CTA banner', () => {
    renderHomePage();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
});
