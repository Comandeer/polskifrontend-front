import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import * as loginHelper from '../core/helpers/loginHelper';

export const getAdminBlogListEpic = action$ => {
  return action$.ofType(constants.ADMIN_GET_BLOG_LIST)
    .mergeMap(() => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.get(`${apiUrl}/admin/blogs`, headers)
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          return {
            type: constants.ADMIN_GET_BLOG_LIST_SUCCESS,
            payload: responseData.response.blogs
          };
        })
        .catch(error => ({
          type: constants.ADMIN_GET_BLOG_LIST_ERROR,
          payload: error
        }));
    });
};

export const deleteBlogEpic = action$ => {
  return action$.ofType(constants.ADMIN_DELETE_BLOG)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.delete(`${apiUrl}/admin/blogs/${action.payload}`, headers)
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          if (responseData.response.success === false) {
            return {
              type: constants.ADMIN_DELETE_BLOG_ERROR,
              payload: responseData.response.message
            };
          }

          return {
            type: constants.ADMIN_DELETE_BLOG_SUCCESS,
            payload: responseData.response.blogs
          };
        })
        .catch(error => ({
          type: constants.ADMIN_DELETE_BLOG_ERROR,
          payload: error
        }))
    });
};

export const addBlogEpic = action$ => {
  return action$.ofType(constants.ADMIN_ADD_BLOG)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/blogs`,
          body: action.payload,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          console.log(responseData.response);
          if (responseData.response.success === false) {
            return {
              type: constants.ADMIN_ADD_BLOG_ERROR,
              payload: responseData.response.message
            };
          }

          return {
            type: constants.ADMIN_ADD_BLOG_SUCCESS,
            payload: responseData.response.blog
          };
        })
        .catch(error => ({
          type: constants.ADMIN_ADD_BLOG_ERROR,
          payload: error
        }))
    });
};