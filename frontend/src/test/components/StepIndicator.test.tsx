import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepIndicator from '../../components/Wizard/StepIndicator';

const STEPS = [
  { step: 1, title: 'Check Eligibility' },
  { step: 2, title: 'Register to Vote' },
  { step: 3, title: 'Find Your Polling Booth' },
  { step: 4, title: 'Voting Day' },
];

describe('StepIndicator', () => {
  it('renders all step buttons', () => {
    render(<StepIndicator steps={STEPS} currentStep={0} onGoTo={vi.fn()} />);
    expect(screen.getAllByRole('button').length).toBe(4);
  });

  it('marks the current step with aria-current="step"', () => {
    render(<StepIndicator steps={STEPS} currentStep={1} onGoTo={vi.fn()} />);
    const currentBtn = screen.getByRole('button', { name: /step 2.*current/i });
    expect(currentBtn).toHaveAttribute('aria-current', 'step');
  });

  it('shows checkmark for completed steps', () => {
    render(<StepIndicator steps={STEPS} currentStep={2} onGoTo={vi.fn()} />);
    // Steps 1 and 2 are completed — they should have "completed" in aria-label
    expect(screen.getByRole('button', { name: /step 1.*completed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /step 2.*completed/i })).toBeInTheDocument();
  });

  it('calls onGoTo with correct index when step button is clicked', async () => {
    const onGoTo = vi.fn();
    render(<StepIndicator steps={STEPS} currentStep={0} onGoTo={onGoTo} />);
    await userEvent.click(screen.getByRole('button', { name: /step 2/i }));
    expect(onGoTo).toHaveBeenCalledWith(1);
  });

  it('displays step progress text', () => {
    render(<StepIndicator steps={STEPS} currentStep={0} onGoTo={vi.fn()} />);
    expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
  });
});
