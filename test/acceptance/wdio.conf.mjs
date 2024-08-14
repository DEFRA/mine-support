// Converted the configuration to use ESM (ECMAScript modules) with the .mjs extension

import allureReporter from '@wdio/allure-reporter'
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { ReportAggregator } from 'wdio-html-nice-reporter';
import commands from "@rpii/wdio-commands";
import moment from 'moment';

import logger from '@wdio/logger';
const log = logger('internal');

const envRoot = (process.env.TEST_ENVIRONMENT_ROOT_URL || 'http://host.docker.internal:3000')
const tags = (process.env.TEST_TAGS || '')
const chromeArgs = process.env.CHROME_ARGS ? process.env.CHROME_ARGS.split(' ') : [
  "--headless",
  '--no-sandbox',
  '--disable-infobars',
  '--disable-gpu',
  '--window-size=1440,735'
]

const firefoxArgs = process.env.CHROME_ARGS ? process.env.CHROME_ARGS.split(' ') : ["--headless"];
const maxInstances = process.env.MAX_INSTANCES ? Number(process.env.MAX_INSTANCES) : 5;

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: 'local',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // of the configuration file being run.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: [
    './features/**/*.feature'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  // define specific suites
  suites: {
    login: [
      './features/login.feature'
    ],
    otherFeature: [

    ]
  },
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [
    {
      maxInstances,
      acceptInsecureCerts: true,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: chromeArgs
      }
    },
    // {
    //   maxInstances,
    //   browserName: "firefox",
    //   "moz:firefoxOptions": {
    //     args: firefoxArgs
    //   }
    // }
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'trace',
  outputDir: './logs/',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  // baseUrl: "http://localhost:3000",
  //host: 'selenium-hub',
  hostname: process.env.HOST_NAME || "localhost",
  //port: 4444,

  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: envRoot + '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT ? process.env.WAIT_FOR_TIMEOUT: 10000),
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 1,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  services: [
    ['browserstack', {
      testObservability: true,
      testObservabilityOptions: {
        projectName: process.env.BROWSERSTACK_PROJECT_NAME,
        buildName: "FFC Demo Web regression"
      },
      browserstackLocal: true
    }]
  ],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',

  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: ['spec',
    // ['allure', {
    //   outputDir: './html-reports/allure-results',
    //   disableWebdriverStepsReporting: true,
    //   disableWebdriverScreenshotsReporting: false,
    //   useCucumberStepReporter: true,
    //   addConsoleLogs: true
    // }],
    [video, {
      saveAllVideos: true,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 5,      // Max seconds to wait for a video to finish rendering\
      outputDir: './html-reports/screenshots',
    }],
    ["html-nice", {
      debug: true,
      outputDir: './html-reports',
      filename: 'feature-report.html',
      reportTitle: 'Feature Test Report',
      //to show the report in a browser when done
      showInBrowser: false,
      collapseTests: false,
      //to turn on screenshots after every test
      useOnAfterCommandForScreenshot: true,
      linkScreenshots: true
    }]
    // ['cucumberjs-json', {
    //   jsonFolder: './html-reports/json',
    //   language: 'en',
    // }]
  ],

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: ['./steps/**/*.js'], // <string[]> (file/dir) require files before executing features
    backtrace: false, // <boolean> show full backtrace for errors
    requireModule: ['@babel/register'], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: false, // <boolean> fail if there are any undefined or pending steps
    tagExpression: tags, // <string> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 60000, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false // <boolean> Enable this config to treat undefined definitions as warnings.
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    log.info(`Running tests against ${envRoot}\n`)
    // const timestamp = moment().format('DDMMYYYY_HHmm');

    let reportAggregator = new ReportAggregator(
      {
        outputDir: './html-reports/nice-report/',
        // filename: 'master-report.html',
        filename: process.env.TEST_BROWSER + '-master-report.html',
        reportTitle: 'FFC-Demo-Web Acceptance Tests',
        browserName: process.env.TEST_BROWSER ? process.env.TEST_BROWSER : 'unspecified',
        //to show the report in a browser when done
        showInBrowser: true,
        collapseTests: true,
        //to turn on screenshots after every test
        useOnAfterCommandForScreenshot: true,
        linkScreenshots: true
      });

    reportAggregator.clean();

    global.reportAggregator = reportAggregator;
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialize specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {string} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  //   require('expect-webdriverio');
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
   */
  before: function (capabilities, specs) {
    //@ts-ignore
    commands.addCommands(driver);
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  beforeFeature: async function (uri, feature) {

    // allureReporter.addFeature(feature.name);
    // allureReporter.addStep(`Starting Feature : ${feature.name}`);

    await browser.maximizeWindow();
  },
  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {object}                 context  Cucumber World object
   */
  // beforeScenario: async function (world) {

  //   allureReporter.addFeature(world.name);
  //   console.log(`"adding feature ${world.name}`)
  // },
  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {object}             context  Cucumber World object
   */
  // beforeStep: function (step, scenario, context) {
  // },
  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {object}             context          Cucumber World object
   */
  afterStep: async function (step, scenario, result, context) {
    const path = require('path')
    const moment = require('moment')
    const screenshotFileName = context.uri.split('.feature')[0].split('/').slice(-1)[0]
    const timestamp = moment().format('YYYYMMDD-HHmmss.SSS')
    const filepath = path.join('./html-reports', 'screenshots', screenshotFileName + '-' + timestamp + '.png')

    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');

    await browser.saveScreenshot(filepath);
    process.emit('test:screenshot', filepath);

  },

  /**
  * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  * @param {Object} test test details
  */
  // afterTest: function (test, context, result) {
  //   // if test passed, ignore, else take and save screenshot.
  //   if (result.passed) {
  //       return;
  //   }
  //   //@ts-ignore
  //   driver.logScreenshot(String.format("Test Ended in {0}", result.error.stack));
  // },
  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {object}                 context          Cucumber World object
   */
  // afterScenario: function (world, result, context) {
  // },
  /**
   *
   * Runs after a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // afterFeature: function (uri, feature) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
  * Gets executed when a refresh happens.
  * @param {string} oldSessionId session ID of the old session
  * @param {string} newSessionId session ID of the new session
  */
  // onReload: function(oldSessionId, newSessionId) {
  // }
  /**
  * Hook that gets executed before a WebdriverIO assertion happens.
  * @param {object} params information about the assertion to be executed
  */
  // beforeAssertion: function(params) {
  // }
  /**
  * Hook that gets executed after a WebdriverIO assertion happened.
  * @param {object} params information about the assertion that was executed, including its results
  */
  // afterAssertion: function(params) {
  // }

  /**
 * Gets executed after all workers got shut down and the process is about to exit. An error
 * thrown in the onComplete hook will result in the test run failing.
 * @param {object} exitCode 0 - success, 1 - fail
 * @param {object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {<Object>} results object containing test results
 */
  onComplete: async function (exitCode, config, capabilities, results) {
    (async () => {
      await global.reportAggregator.createReport();
    })();
  },

  /**
 * Gets executed just before initialising the webdriver session and test framework. It allows you
 * to manipulate configurations depending on the capability or spec.
 * @param {object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that are to be run
 * @param {string} cid worker id (e.g. 0-0)
 */
  // beforeSession: function (config, capabilities, specs, cid) {
  // }

}
