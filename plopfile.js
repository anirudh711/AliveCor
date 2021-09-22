module.exports = function (plop) {

    plop.setGenerator('screen', {
        description: 'React screen using javascript',
        prompts: [
          {
            type: 'input',
            name: 'name',
            message: 'Name: '
          },
          {
            type: 'input',
            name: 'tag',
            message: 'Tag name: '
          },
        ],
        actions: [
          {
            type: 'addMany',
            destination: 'src/screens/{{name}}',
            templateFiles: 'src/internals/screens/*.hbs',
            base: 'src/internals/screens',
          },
        ]
    });
  };