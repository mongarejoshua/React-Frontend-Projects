export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const phonePattern = /^\+?[\d\s().-]{7,20}$/
export const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export function validateRegistration(values) {
  const errors = {}
  const required = ['firstName', 'lastName', 'username', 'email', 'phone', 'gender', 'dateOfBirth', 'country', 'region', 'address', 'password', 'confirmPassword']
  required.forEach((field) => {
    if (!String(values[field] || '').trim()) errors[field] = 'This field is required.'
  })
  if (values.email && !emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (values.phone && !phonePattern.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (values.password && !strongPasswordPattern.test(values.password)) errors.password = 'Use 8+ characters with uppercase, lowercase, a number, and a symbol.'
  if (values.confirmPassword && values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match.'
  if (!values.terms) errors.terms = 'Please accept the terms to continue.'
  if (values.dateOfBirth && new Date(values.dateOfBirth) >= new Date()) errors.dateOfBirth = 'Date of birth must be in the past.'
  return errors
}

export function validatePassword(password) {
  return strongPasswordPattern.test(password)
}
