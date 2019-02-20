import React from 'react';
import NavBar from './nav_bar/nav_bar_container';
import { Route, Switch, Redirect, HashRouter, Link } from 'react-router-dom';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePage from './home_page/home_page_container';
import CreatePollForm from './polls/create_poll_container';
import CreateChoiceForm from './choices/create_choice_container';
import UserShow from './users/user_container';
import PollShow from './polls/poll_show_container';
import PollsShow from './polls/polls_show_container';
import ResponseForm from './responses/create_response_container';
import EditPollForm from './polls/edit_poll_container';
import ActivePollResponseForm from './responses/active_poll_response_container';
import Modal from './modal/modal';
import BlueNavBar from './nav_bar/blue_nav_bar_container';







const App = () => (    
  <div>
    <Modal />
    <header>
      
    </header>
    <Route exact path="/" component={HomePage}/>

    <Switch>

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      {/* <Route exact path="/polls" component={PollsShow}/> */}
      <ProtectedRoute exact path="/polls/:pollId" component={PollShow}/>
      <ProtectedRoute exact path="/users/:userId" component={UserShow}/>
      <ProtectedRoute exact path="/createpoll" component={CreatePollForm} />
      {/* <Route exact path="/createchoice" component={CreateChoiceForm}/> */}
      <ProtectedRoute exact path="/polls/:pollId/edit" component={EditPollForm}/>
      <ProtectedRoute exact path="/:userId/respond" component={ActivePollResponseForm}/>



    </Switch>

  </div>
)

export default App;