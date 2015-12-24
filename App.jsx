// App component - represents the whole app
App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            tasks: Tasks.find({}, {
                sort: { createdAt: -1 }
            }).fetch()
        };
    },

    renderTasks() {
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />;
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        const input = ReactDOM.findDOMNode(this.refs.textInput);
        const text = input.value.trim();

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
                <h1>Todo List</h1>

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