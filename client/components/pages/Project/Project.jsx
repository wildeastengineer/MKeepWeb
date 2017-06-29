import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentProject } from 'store/projects/actions'

class Project extends Component {
    static propTypes = {
        currentProjectId: PropTypes.string,
        params: PropTypes.shape({
            projectId: PropTypes.string
        }),
        children: PropTypes.node,
        dispatch: PropTypes.func
    };

    componentWillMount() {
        const urlProjectId = this.props.params.projectId;

        if (this.props.currentProjectId !== urlProjectId) {
            this.props.dispatch(setCurrentProject(urlProjectId));
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

export default connect(mapStateToProps)(Project);
