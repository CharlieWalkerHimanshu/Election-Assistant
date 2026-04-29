import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import VotingInfoPage from '../../pages/VotingInfoPage';
import type { VotingInfo } from '../../types';

// Mock the api module
vi.mock('../../services/api', () => ({
  fetchVotingInfo: vi.fn(),
}));

import { fetchVotingInfo } from '../../services/api';
const mockFetch = vi.mocked(fetchVotingInfo);

const MOCK_RESULT: VotingInfo = {
  region: 'Delhi',
  state: 'Delhi (NCT)',
  pollingBoothFinderUrl: 'https://electoralsearch.eci.gov.in/',
  stateElectionCommissionUrl: 'https://ceodelhi.gov.in/',
  voterHelpline: '1950',
  additionalLinks: [
    { label: 'Voter Registration (Form 6)', url: 'https://voters.eci.gov.in/signup' },
  ],
  tip: 'Use the Voter Helpline App.',
};

function renderPage() {
  return render(
    <MemoryRouter>
      <VotingInfoPage />
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('VotingInfoPage', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Find My Voting Info/i);
  });

  it('renders the search input and button', () => {
    renderPage();
    expect(screen.getByLabelText(/enter city, state, or pin code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('search button is disabled when input has fewer than 2 characters', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('renders popular region suggestion pills', () => {
    renderPage();
    expect(screen.getByText('Delhi')).toBeInTheDocument();
    expect(screen.getByText('Karnataka')).toBeInTheDocument();
  });

  it('shows result card after successful search', async () => {
    mockFetch.mockResolvedValueOnce(MOCK_RESULT);
    renderPage();

    const input = screen.getByLabelText(/city, state, or pin code/i);
    await userEvent.type(input, 'Delhi');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Delhi');
    });
    expect(screen.getByText('1950')).toBeInTheDocument();
  });

  it('shows error message for 404 response', async () => {
    mockFetch.mockRejectedValueOnce({ response: { status: 404 } });
    renderPage();

    const input = screen.getByLabelText(/city, state, or pin code/i);
    await userEvent.type(input, 'Atlantis');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/No information found/i);
    });
  });

  it('shows error message for 422 response', async () => {
    mockFetch.mockRejectedValueOnce({ response: { status: 422 } });
    renderPage();

    const input = screen.getByLabelText(/city, state, or pin code/i);
    await userEvent.type(input, 'XX');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/valid city\/state/i);
    });
  });

  it('clicking a suggestion pill triggers a search', async () => {
    mockFetch.mockResolvedValueOnce(MOCK_RESULT);
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Delhi' }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('Delhi');
    });
  });

  it('renders tip box in result', async () => {
    mockFetch.mockResolvedValueOnce(MOCK_RESULT);
    renderPage();

    await userEvent.type(screen.getByLabelText(/city, state, or pin code/i), 'Delhi');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('note')).toHaveTextContent(/Voter Helpline App/i);
    });
  });
});
