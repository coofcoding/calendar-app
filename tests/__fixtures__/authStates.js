export const initialState = {
    status: "checking",
    user: {},
    errorMessage: undefined,
};

export const authenticatedState = {
    status: "authenticated",
    user: {
        uid: '65d3d89c12245cdced9620ab',
        name: 'kevin',
    },
    errorMessage: undefined,
};

export const notAuthenticatedState = {
    status: "not-authenticated",
    user: {},
    errorMessage: undefined,
};
