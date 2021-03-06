import React from "react";
import { Link } from "react-router-dom";
import ChoiceForm from "../choices/create_choice_container";
import merge from "lodash/merge";
import EditChoiceShow from "../choices/edit_choice_show";
import BlueNavBar from "../nav_bar/blue_nav_bar_container";

class EditPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "", choice1: "", choice2: "", choiceArray: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChoice = this.addChoice.bind(this);
  }

  componentDidMount() {
    this.props.showPoll(this.props.match.params.pollId);
    this.props.showAllChoices();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.prevChoices !== this.props.prevChoices) {
      this.setState({ body: nextProps.body });
      let newChoiceArray = this.state.choiceArray;
      nextProps.prevChoices.forEach((choice, idx) => {
        newChoiceArray.push(
          <input
            key={idx + 1}
            className="choice-inside-poll"
            placeholder={choice.body}
            onChange={this.update([`choice${idx + 1}`])}
          />
        );
        this.setState({
          [`choice${idx + 1}`]: choice.body,
          choiceArray: newChoiceArray
        });
      });
    }
  }

  update(field) {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.prevChoices.forEach(choice => {
      this.props.destroyChoice(choice.id);
    });
    const poll = this.props.poll;
    const newPoll = {
      group_id: poll.group_id,
      user_id: poll.user_id,
      body: this.state.body,
      category: poll.category,
      active: poll.active
    };

    let choiceObject = this.state;
    delete choiceObject["body"];
    delete choiceObject["choiceArray"];
    let choices = Object.values(choiceObject);
    this.props.updatePoll(newPoll, poll.id, choices);
    this.props.history.push(`/users/${this.props.userId}`);
  }

  addChoice(e) {
    e.preventDefault();
    let newArr = this.state.choiceArray;
    const identifier = newArr.length + 1;
    newArr.push(
      <input
        key={identifier}
        className="choice-inside-poll"
        onChange={this.update([`choice${identifier}`])}
      />
    );
    this.setState({
      choiceArray: newArr,
      [`choice${identifier}`]: ""
    });
  }

  render() {
    if (!this.props.poll || !this.props.poll.choice_ids) {
      return null;
    }

    return (
      <div>
        <BlueNavBar />
        <div className="empty-space" />
        <ul className="gray-box">
          <form onSubmit={this.handleSubmit}>
            <input
              className="poll-input-box"
              value={this.state.body}
              onChange={this.update("body")}
            />

            <ul>{this.state.choiceArray}</ul>
            <button className="add-choice" onClick={this.addChoice}>
              <i className="fas fa-plus" /> &nbsp;Add option
            </button>

            <div className="horizontal-dashes" />
            <input
              type="submit"
              className="submit-button"
              value={"Save Changes"}
            />
          </form>
        </ul>
      </div>
    );
  }
}

export default EditPoll;
