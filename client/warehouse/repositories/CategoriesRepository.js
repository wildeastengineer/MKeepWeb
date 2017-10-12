// Libs
import request from 'superagent';
// App modules
import Repository from './Repository';
import { getErrorMessage } from '../helpers/repositoryHelper';

class CategoriesRepository extends Repository {
    getUrl(action, projectId, categoryId) {
        switch (action) {
            case 'projectCategories':
                return super.getUrl(`projects/${projectId}/categories`);
            case 'create':
                return super.getUrl(`projects/${projectId}/categories`);
            case 'update':
                return super.getUrl(`projects/${projectId}/categories/${categoryId}`);
            case 'remove':
                return super.getUrl(`projects/${projectId}/categories/${categoryId}`);
            default:
                return Promise.reject('Unknown action');
        }
    }

    getList(projectId) {
        return new Promise((resolve, reject) => {
            this.getUrl('projectCategories', projectId)
                .then((url) => {
                    request
                        .get(url)
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            resolve(response.body);
                        });
                });
        });
    }

    create(projectId, category) {
        return new Promise((resolve, reject) => {
            this.getUrl('create', projectId)
                .then((url) => {
                    const data = {
                        name: category.name,
                        type: category.type,
                        parent: category.parent || null
                    };

                    request
                        .put(url)
                        .send(data)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const category = response.body;

                            resolve(category);
                        });
                });
        });
    }

    update(projectId, categoryId, categoryData) {
        return new Promise((resolve, reject) => {
            this.getUrl('update', projectId, categoryId)
                .then((url) => {
                    if (!categoryData.parent) {
                        categoryData.parent = null;
                    }

                    request
                        .patch(url)
                        .send(categoryData)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const category = response.body;

                            resolve(category);
                        });
                });
        });
    }

    remove(projectId, categoryId) {
        return new Promise((resolve, reject) => {
            this.getUrl('remove', projectId, categoryId)
                .then((url) => {
                    request
                        .delete(url)
                        .set('Accept', 'application/json')
                        .end((error, response) => {
                            if (error) {
                                return reject(getErrorMessage(error, response));
                            }

                            const category = response.body;

                            resolve(category);
                        });
                });
        });
    }
}

export default CategoriesRepository;
