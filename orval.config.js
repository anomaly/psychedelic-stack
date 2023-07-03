module.exports = {
  labs: {
    output: {
      mode: 'tags-split',
      target: 'api/labs.ts',
      schemas: 'api/models',
      mock: true,
    },
    input: {
      target: 'http://localhost:8000/openapi.json',
    },
  },
};