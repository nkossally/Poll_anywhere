import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state={active_poll_id: "", selected_polls: []};
    this.activate = this.activate.bind(this);
    this.selectPoll = this.selectPoll.bind(this);
    
  }

  componentDidMount(){
    this.props.showAllPolls();
    this.props.showAllGroups();
  }

  selectPoll(id, checkboxId){
    return()=>{
      let that = this;

      let newSelection = this.state.selected_polls;
      if(newSelection.includes(id)){
        newSelection.splice(newSelection.indexOf(id), 1);
      } else {
        newSelection.push(id);
      }
      this.setState({selected_polls: newSelection});
      this.toggleCheckbox(checkboxId)
      debugger
    }
  }

  toggleCheckbox(checkboxId) {
    // let checkbox = document.getElementById(checkboxId);
    // debugger

    // checkbox.checked = !checkbox.checked;
    // debugger
  }

  activate(id){
    return()=>{
      let inactivePoll = {active: false};
      let activePoll = {active: true};
      for(let i=0; i<this.props.polls.length; i++){
        const poll = this.props.polls[i];

        if(poll.id === id){
          this.props.updatePoll(activePoll, poll.id)
        } else {
          this.props.updatePoll(inactivePoll, poll.id)
        }
      }
      this.setState({active_poll_id: id})
    } 
  }


  render() {
    const groupsAndPolls = this.props.groups.map(group=>{
      return(
        <div key={group.id}>
          <li >{group.title}</li>
          <ul>
            {group.polls.map(poll=>{
              let className;
              if(poll.active){
                className = "green-user-single-poll";
              } else {
                className = "user-single-poll";
              }
              return(
                <div className={className} key={poll.id}> 

                  <div className="check-container">
                    <input type="checkbox" id={`checkbox${poll.id}`} onClick={this.selectPoll(poll.id, `checkbox${poll.id}`)}/>
                  </div>
                  
                  <Link to={`/polls/${poll.id}`}><div className="poll-text">{poll.body}</div></Link>
                
                  <button onClick={this.activate(poll.id)}>
                    <i className="fas fa-toggle-on"></i>
                  </button>

                </div>
                )
            })}
          </ul>
        </div>
      )
      
    })
    
    return (
      <div className="user-container">
        <Link to="/createpoll">
          <div className="user-create-button">
            Create
          </div>
        </Link>
        <ul className="user-polls">
          <li className="user-polls-header">
            <button>Group</button>
            <button>Ungroup</button>
          </li>

          {groupsAndPolls}

        </ul>
  
      </div>
  
    )
  }
}


export default User;