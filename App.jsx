// App component - represents the whole app
App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            hideCompleted: false
        };
    },

    toggleHideCompleted() {
        this.setState({
            hideCompleted: ! this.state.hideCompleted
        });
    },

    getMeteorData() {
        let query = {};

        if (this.state.hideCompleted) {
            query = { checked: {$ne: true} };
        }

        return {
            tasks: Tasks.find(query, {
                        sort: { createdAt: -1 }
                    }).fetch(),
            incompleteCount: Tasks.find({
                                checked: {$ne: true}
                            }).count()
        };
    },

    renderTasks() {
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />;
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        const input = ReactDOM.findDOMNode(this.refs.textInput),
            text = input.value.trim();

        Tasks.insert({
            text: text,
            createdAt: new Date()
        });

        input.value = "";
    },

    render() {
        return (
          <div className="container">
            <header>
                <h1>Todo List ({this.data.incompleteCount})</h1>

                <label className="hide-completed">
                    <input type="checkbox"
                        readOnly={true}
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted}
                    />
                    Hide Completed Tasks
                </label>

                <form className="new-task" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        ref="textInput"
                        placeholder="Type something"
                    />

                </form>
            </header>

            <ul>
              {this.renderTasks()}
            </ul>
          </div>
        );
    }
});