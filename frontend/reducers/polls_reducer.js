import {
  RECEIVE_POLL,
  RECEIVE_POLLS,
  DELETE_POLL
} from "../actions/poll_actions";
import merge from "lodash/merge";

const pollsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_POLL:
      if (action.poll.id) {
        newState = merge({}, oldState, { [action.poll.id]: action.poll });
        return newState;
      } else {
        newState = merge({}, oldState, {
          [action.poll.poll.id]: action.poll.poll
        });
        return newState;
      }
    case RECEIVE_POLLS:
      newState = merge({}, action.polls);
      return newState;
    case DELETE_POLL:
      newState = merge({}, oldState);
      delete newState[action.id];
      return newState;
    default:
      return oldState;
  }
};
export default pollsReducer;
