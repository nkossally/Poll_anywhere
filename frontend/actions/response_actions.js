import * as ResponseApiUtil from "../util/response_api_util";

export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const RECEIVE_RESPONSES = "RECEIVE_RESPONSES";
export const DELETE_RESPONSE = "DELETE_RESPONSE";
export const RECEIVE_RESPONSE_ERRORS = "RECEIVE_RESPONSE_ERRORS";

export const createResponse = response => {
  return dispatch => {
    ResponseApiUtil.createResponse(response).then(
      response => {
        return dispatch(receiveResponse(response));
      },
      errors => {
        return dispatch(receiveResponseErrors(errors.responseJSON));
      }
    );
  };
};

export const showResponse = id => {
  return dispatch => {
    ResponseApiUtil.showResponse(id).then(
      response => {
        return dispatch(receiveResponse(response));
      },
      errors => {
        return dispatch(receiveResponseErrors(errors.responseJSON));
      }
    );
  };
};

export const showAllResponses = () => {
  return dispatch => {
    ResponseApiUtil.showAllResponses().then(
      responses => {
        return dispatch(receiveResponses(responses));
      },
      errors => {
        return dispatch(receiveResponseErrors(errors.responseJSON));
      }
    );
  };
};

export const destroyResponse = id => {
  return dispatch => {
    ResponseApiUtil.destroyResponse(id).then(
      () => {
        return dispatch(deleteResponse(id));
      },
      errors => {
        return dispatch(receiveResponseErrors(errors.responseJSON));
      }
    );
  };
};

const receiveResponse = response => ({
  type: RECEIVE_RESPONSE,
  response
});

const receiveResponses = responses => ({
  type: RECEIVE_RESPONSES,
  responses
});

const deleteResponse = id => ({
  type: DELETE_RESPONSE,
  id
});

const receiveResponseErrors = errors => ({
  type: RECEIVE_RESPONSE_ERRORS,
  errors
});
