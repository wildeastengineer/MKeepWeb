export const getErrorMessage = (error, response) => {
    if (error) {
        return error.message;
    }

    switch (response.body.error) {
        case 'invalid_grant':
            return 'Wrong email or password';
    }

    return 'Error';
};
