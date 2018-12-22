const baseURL = 'http://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600';

const api = (url, options) => new Promise((resolve, reject) => {
  fetch(`${baseURL}${url}`, options)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(e => reject(e));
});

export default api; 
