import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
    state = {
        error: null
    }

    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }

    render() {
        if(this.state.error) {
            return (
                <div className="error">
                    <h3>Something went wrong</h3>
                    <p>Try refreshing the page</p>
                </div>
            );
        }
        return this.props.children;
    }
}