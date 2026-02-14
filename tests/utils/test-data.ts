export const TestUsers = {
  validUser: {
    email: 'user@example.com',
    password: 'SecurePass123!',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'AdminPass123!',
  },
};

export const VwoTestUsers = {
  dummyUser: {
    email: 'dummy@test.com',
    password: 'WrongPass123!',
  },
  emptyUser: {
    email: '',
    password: '',
  },
  whitespaceEmail: {
    email: '  spaces@test.com  ',
    password: 'SomePass123!',
  },
};

export const TestData = {
  searchTerms: ['Playwright', 'Automation', 'Testing'],
  productNames: ['Product A', 'Product B', 'Product C'],
};
