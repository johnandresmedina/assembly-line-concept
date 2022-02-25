import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

const RIGHT_CLICK = 2;

describe('<App />', () => {
  it('should render the main title', () => {
    render(<App />);

    expect(screen.getByText(/Assembly line/i)).toBeInTheDocument();
  });

  it('should render the assembly line input', () => {
    render(<App />);

    expect(screen.getByTestId('assembly-line-input')).toBeInTheDocument();
  });

  it('should render the assembly line title', () => {
    render(<App />);

    expect(screen.getByText(/idea/i)).toBeInTheDocument();
    expect(screen.getByText(/development/i)).toBeInTheDocument();
    expect(screen.getByText(/testing/i)).toBeInTheDocument();
    expect(screen.getByText(/deployment/i)).toBeInTheDocument();
  });

  it('should display the new task after pressing the Enter key', () => {
    render(<App />);

    const input = screen.getByLabelText(/add an item/i);
    userEvent.type(input, 'Item #1{enter}');

    const firstStage = screen.getByTestId(/stage-idea/i);

    expect(within(firstStage).getByText(/item #1/i)).toBeInTheDocument();
  });

  it('should remove a task when right clicking if its on the first stage', () => {
    render(<App />);

    const input = screen.getByLabelText(/add an item/i);
    userEvent.type(input, 'Item #1{enter}');
    const task = screen.getByText(/item #1/i);

    expect(task).toBeInTheDocument();

    userEvent.click(task, { button: RIGHT_CLICK });

    expect(screen.queryByText(/item #1/i)).not.toBeInTheDocument();
  });

  it('should move a task to the right when clicking', () => {
    render(<App />);

    const input = screen.getByLabelText(/add an item/i);
    userEvent.type(input, 'Item #1{enter}');
    const task = screen.getByText(/item #1/i);

    expect(task).toBeInTheDocument();

    userEvent.click(task);

    const secondStage = screen.getByTestId(/stage-development/i);

    expect(within(secondStage).getByText(/item #1/i)).toBeInTheDocument();
  });

  it('should move back a task after left clicking and then right clicking', () => {
    render(<App />);

    const input = screen.getByLabelText(/add an item/i);
    userEvent.type(input, 'Item #1{enter}');
    const task = screen.getByText(/item #1/i);

    expect(task).toBeInTheDocument();

    userEvent.click(task);

    const secondStage = screen.getByTestId(/stage-development/i);
    expect(within(secondStage).getByText(/item #1/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/item #1/i), { button: RIGHT_CLICK });
    const firstStage = screen.getByTestId(/stage-idea/i);
    expect(within(firstStage).getByText(/item #1/i)).toBeInTheDocument();
  });

  it('should remove a task when left clicking if its on the last stage', () => {
    render(<App />);

    const input = screen.getByLabelText(/add an item/i);
    userEvent.type(input, 'Item #1{enter}');
    const task = screen.getByText(/item #1/i);

    expect(task).toBeInTheDocument();

    userEvent.click(screen.getByText(/item #1/i));
    userEvent.click(screen.getByText(/item #1/i));
    userEvent.click(screen.getByText(/item #1/i));
    userEvent.click(screen.getByText(/item #1/i));

    expect(screen.queryByText(/item #1/i)).not.toBeInTheDocument();
  });
});
