import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userUpdateApi = createApi({
  reducerPath: 'userUpdateApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/api/v1' ,
    prepareHeaders: (headers, { getState }) => {
      //Type de contenu
      headers.set('Accept', 'application/json');
      headers.set('Access-Control-Allow-Headers','Accept');

      // Récupérer le token depuis le store Redux 
      const token = getState().auth?.token;

        if (token){
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
    },  
  ),      
  endpoints: (builder) => ({
    updateUser : builder.mutation({
      query : (user) => ({
        url: '/user/profile',
        method: 'PUT',
        body: user,
      }),
    })  
  })  
});

export const {useUpdateUserMutation} = userUpdateApi