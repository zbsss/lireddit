import { UsernamePasswordInput } from 'src/resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  const errors = [];

  if (!options.email.includes('@')) {
    errors.push({ field: 'email', message: 'invalid email' });
  }

  if (options.username.includes('@')) {
    errors.push({ field: 'username', message: 'cannot include @' });
  }

  if (options.username.length <= 2) {
    errors.push({ field: 'username', message: 'lenght must be greater than 2' });
  }
  if (options.password.length <= 2) {
    errors.push({ field: 'password', message: 'lenght must be greater than 2' });
  }

  return errors;
};
