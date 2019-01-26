import { connect } from 'react-redux';
import {create, destroy, show, showAll } from '../../actions/poll_actions';

import Poll from './poll';

const mapStateToProps = (state) => {
  return {
    polls: state.entities.polls
  };
};

const mapDispatchToProps = dispatch => ({
  create: (poll) => dispatch(create(poll)),
  destroy: (id) => dispatch(destroy(id)),
  show: (id) => dispatch(show(id)),
  showAll: () => dispatch(showAll()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);