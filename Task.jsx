Task = React.createClass({
    propTypes: {
        task: React.PropTypes.object.isRequired,
        showPrivateBtn: React.PropTypes.bool.isRequired
    },

    removeTask() {
        Meteor.call("removeTask", this.props.task._id);
    },

    toggleChecked() {
        Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
    },

    togglePrivateTask() {
        Meteor.call("setPrivateTask", this.props.task._id, ! this.props.task.private);
    },

    render() {
        const taskClassName = (this.props.task.checked ? "checked" : "") +
            (this.props.task.private ? "provate" : "");


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

                { this.props.showPrivateBtn ?
                    <button className="toggle-privat"
                        onClick={this.togglePrivateTask}
                    >
                        { this.props.task.private ? "Private" : "Public" }
                    </button> : ""
                }
                
                <span className="text">
                    <strong>{this.props.task.username}</strong> :
                    {this.props.task.text}
                </span>                
            </li>
        );
    }
});