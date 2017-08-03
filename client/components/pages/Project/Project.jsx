import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withCookies } from 'warehouse';
import { setCurrentProject } from 'store/projects/actions'

class Project extends Component {
    static propTypes = {
        currentProjectId: PropTypes.string,
        params: PropTypes.shape({
            projectId: PropTypes.string
        }),
        children: PropTypes.node,
        getCookies: PropTypes.func.isRequired,
        location: PropTypes.object,
        dispatch: PropTypes.func
    };

    componentDidMount() {
        const projectId = this.props.params.projectId;

        if (this.props.currentProjectId !== projectId) {
            const cookies = this.props.getCookies();
            const redirectUrl = this.props.location.pathname;

            this.props.dispatch(setCurrentProject(projectId, cookies, {
                redirect: redirectUrl
            }));
        }
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    const projectData = state.projects.currentProject.data;

    return {
        currentProjectId: projectData ? projectData._id : ''
    };
}

export default connect(mapStateToProps)(withCookies(Project));
