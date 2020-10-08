'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the classy ${chalk.red('generator-tis-module')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the module\'s name?'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What is the module\'s version?',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the module\'s description'
      },
      {
        type: 'input',
        name: 'repositoryType',
        message: 'What is the repository type',
        default: 'git'
      },
      {
        type: 'input',
        name: 'repositoryUrl',
        message: 'What is the repository url?'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords - comma separated'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    mkdirp.sync(`${this.destinationRoot()}/${this.props.name}`);

    this.destinationRoot(this.props.name);

    this.fs.copy(
      this.sourceRoot(),
      this.destinationRoot(), 
      {
        globOptions: {
          ignore: [
            'package.json',
            '_npmignore',
            '_gitignore'
          ],
          dot: true
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        version: this.props.version,
        description: this.props.description,
        repositoryType: this.props.repositoryType,
        repositoryUrl: this.props.repositoryUrl,
        keywords: this.props.keywords.split(',').map((kw) => `"${kw.trim()}"`),
        author: this.props.author
      }
    );

    this.fs.copy(
      this.templatePath('_npmignore'),
      this.destinationPath('.npmignore')
    );

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.delete(this.destinationPath('_npmignore'));
    this.fs.delete(this.destinationPath('_gitignore'));
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    }).then(() => this.log(yosay(`${chalk.blue('Everything is ready for development! Have fun!')}`)));
  }
};
