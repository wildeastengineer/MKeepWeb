export const getErrorMessage = (error, response) => {
    if (error) {
        let responseText;

        if (response) {
            try {
                responseText = JSON.parse(response.text);
            } catch (e) {
                responseText = response.text;
            }

            if (responseText.hasOwnProperty('error_description')) {
                return responseText.error_description;
            }
        }

        if (error.response && error.response.text) {
            return error.response.text;
        }

        if (error.code) {
            return error.code;
        }

        return 'Unknown error';
    }

    switch (response.body.error) {
        case 'invalid_grant':
            return 'Wrong email or password';
    }

    return 'Error';
};
