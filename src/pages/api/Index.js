// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

const api = axios.create({

  baseURL: 'https://api.github.com/users',

});

export default api
