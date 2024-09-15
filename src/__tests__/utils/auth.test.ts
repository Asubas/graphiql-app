import { signInWithGoogle } from '@/src/utils/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(),
}));
describe('signInWithGoogle', () => {
  const mockUser = {
    uid: '123456',
    displayName: 'Test User',
    email: 'testuser@example.com',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in user with Google and return user info', async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({ user: mockUser });
    const user = await signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith(getAuth(), expect.anything());
    expect(user).toEqual(mockUser);
  });

  it('should alert error message on failure', async () => {
    const errorMessage = 'Sign in failed';
    (signInWithPopup as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    await signInWithGoogle();
    expect(alertSpy).toHaveBeenCalledWith(errorMessage);
    alertSpy.mockRestore();
  });

  it('should alert unexpected error message on unknown error', async () => {
    const unexpectedError = 'Something went wrong';
    (signInWithPopup as jest.Mock).mockRejectedValue(unexpectedError);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    await signInWithGoogle();
    expect(alertSpy).toHaveBeenCalledWith('Unexpected error:Something went wrong');
    alertSpy.mockRestore();
  });
});
