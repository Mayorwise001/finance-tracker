// utils/auth.js
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('hasSeenTutorial');
  window.location.href = '/';
};
