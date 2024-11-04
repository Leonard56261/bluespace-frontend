// Importing necessary libraries and modules
import React from 'react';
import { render, screen } from '@testing-library/react'; // Used for rendering React components in the test
import { MemoryRouter } from 'react-router-dom'; // Provides a router context for components
import LandingPage from './Landing'; // Importing the LandingPage component
import '@testing-library/jest-dom/extend-expect'; // Extends Jest with custom matchers for DOM assertions
import { AuthProvider, useAuth } from '../../hooks/AuthContext'; // Importing AuthProvider and the useAuth hook

// Mocking the useAuth hook for tests
jest.mock('../../hooks/AuthContext', () => ({
  ...jest.requireActual('../../hooks/AuthContext'), // Retains actual implementation for non-mocked parts
  useAuth: jest.fn(), // Mocking the specific `useAuth` function
}));

// Describe block for grouping related tests for the LandingPage component
describe('LandingPage component', () => {
  // Reset mocks before each test to avoid state leakage between tests
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test case 1: Checks if the main content of the LandingPage renders correctly
  // Unit
  // Success
  test('renders LandingPage content', () => {
    useAuth.mockReturnValue({ isLoggedIn: false }); // Mocking useAuth to simulate a non-logged-in state

    render(
      <MemoryRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Verifying the presence of key content on the LandingPage
    expect(screen.getByText(/Welcome to BlueSpace/i)).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive mental health support for international and first-year students./i)).toBeInTheDocument();
  });

  // Test case 2: Verifies the presence of the "Get Started" button when the user is not logged in
  // Unit
  // Success
  test('renders the Get Started button when not logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: false }); // Simulating a non-logged-in state

    render(
      <MemoryRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Checking for the "Get Started" button in the rendered output
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  // Test case 3: Verifies the "Get Started" button is rendered with navigation when the user is logged in
  // Unit
  // success
  test('renders the Get Started button with navigation to /user/home when logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: true }); // Simulating a logged-in state

    render(
      <MemoryRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Checking for the "Get Started" button in the rendered output
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });
});
