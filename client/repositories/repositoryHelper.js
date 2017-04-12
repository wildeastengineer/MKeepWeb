export const getErrorMessage = (error, response) => {
    if (error) {
        let responseText;

        try {
            responseText = JSON.parse(response.text);
        } catch (e) {
            responseText = response.text;
        }

        if (responseText.hasOwnProperty('error_description')) {
            return responseText.error_description;
        }

        return error.response.text || error.message;
    }

    switch (response.body.error) {
        case 'invalid_grant':
            return 'Wrong email or password';
    }

    return 'Error';
};
