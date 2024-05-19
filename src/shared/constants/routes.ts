export const ROUTES = {
  shared: {
    tenders: {
      root: '/tenders',
      children: {
        create: '/create'
      },
    }
  },
  public: {
    login: '/login'
  },
  initial: '/',
};
