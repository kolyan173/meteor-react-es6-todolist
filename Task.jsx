// Task component - represents a single todo item
Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired
    },

    removeTask() {
        Tasks.remove(this.props.task._id);
    },

    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: { checked: ! this.props.task.checked }
        });
    },

    render() {
        const taskClassName = this.props.task.checked ? "checked" : "";

        return (
            <li className={taskClassName}>
                <button onClick={this.removeTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked}
                />
                
                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
});