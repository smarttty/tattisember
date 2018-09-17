define('my-own/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('my-own/tests/components/semestr-view.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/semestr-view.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/semestr-view.js should pass jshint.');
  });
});
define('my-own/tests/controllers/educational-programms.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/educational-programms.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/educational-programms.js should pass jshint.');
  });
});
define('my-own/tests/helpers/data-transfer', ['exports', 'ember'], function (exports, _ember) {

  var c = _ember['default'].Object.extend({
    getData: function getData() {
      return this.get('payload');
    },

    setData: function setData(dataType, payload) {
      this.set("data", { dataType: dataType, payload: payload });
    }
  });

  c.reopenClass({
    makeMockEvent: function makeMockEvent(payload) {
      var transfer = this.create({ payload: payload });
      var res = { dataTransfer: transfer };
      res.originalEvent = res;
      res.originalEvent.preventDefault = function () {
        console.log('prevent default');
      };
      res.originalEvent.stopPropagation = function () {
        console.log('stop propagation');
      };
      return res;
    },

    createDomEvent: function createDomEvent(type) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function setData(type, val) {
          this.data[type] = val;
        },
        getData: function getData(type) {
          return this.data[type];
        }
      };
      return event;
    }
  });

  exports['default'] = c;
});
define('my-own/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('my-own/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('my-own/tests/helpers/drag-drop', ['exports', 'ember-native-dom-helpers', 'my-own/tests/helpers/mock-event'], function (exports, _emberNativeDomHelpers, _myOwnTestsHelpersMockEvent) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.drag = drag;

  function dragOver(dropSelector, moves) {
    return regeneratorRuntime.async(function dragOver$(context$1$0) {
      var _this = this;

      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          moves = moves || [[{ clientX: 1, clientY: 1 }, dropSelector]];
          return context$1$0.abrupt('return', moves.forEach(function callee$1$0(_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var position = _ref2[0];
            var selector = _ref2[1];
            var event;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  event = new _myOwnTestsHelpersMockEvent['default'](position);
                  context$2$0.next = 3;
                  return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.triggerEvent)(selector || dropSelector, 'dragover', event));

                case 3:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          }));

        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }

  function drop(dragSelector, dragEvent, options) {
    var dropSelector, dropEndOptions, dragOverMoves, dropElement, event;
    return regeneratorRuntime.async(function drop$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          dropSelector = options.drop;
          dropEndOptions = options.dropEndOptions;
          dragOverMoves = options.dragOverMoves;
          context$1$0.next = 5;
          return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.find)(dropSelector));

        case 5:
          dropElement = context$1$0.sent;

          if (dropElement) {
            context$1$0.next = 8;
            break;
          }

          throw 'There are no drop targets by the given selector: \'' + dropSelector + '\'';

        case 8:
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(dragOver(dropSelector, dragOverMoves));

        case 10:
          if (!options.beforeDrop) {
            context$1$0.next = 13;
            break;
          }

          context$1$0.next = 13;
          return regeneratorRuntime.awrap(options.beforeDrop.call());

        case 13:
          event = new _myOwnTestsHelpersMockEvent['default']().useDataTransferData(dragEvent);
          context$1$0.next = 16;
          return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.triggerEvent)(dropSelector, 'drop', event));

        case 16:
          context$1$0.next = 18;
          return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragend', dropEndOptions));

        case 18:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 19:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }

  function drag(dragSelector) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var dragEvent;
    return regeneratorRuntime.async(function drag$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          dragEvent = new _myOwnTestsHelpersMockEvent['default'](options.dragStartOptions);
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'mouseover'));

        case 3:
          context$1$0.next = 5;
          return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragstart', dragEvent));

        case 5:
          if (!options.afterDrag) {
            context$1$0.next = 8;
            break;
          }

          context$1$0.next = 8;
          return regeneratorRuntime.awrap(options.afterDrag.call());

        case 8:
          if (!options.drop) {
            context$1$0.next = 11;
            break;
          }

          context$1$0.next = 11;
          return regeneratorRuntime.awrap(drop(dragSelector, dragEvent, options));

        case 11:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
});
define('my-own/tests/helpers/ember-drag-drop', ['exports', 'ember', 'jquery', 'my-own/tests/helpers/data-transfer'], function (exports, _ember, _jquery, _myOwnTestsHelpersDataTransfer) {
  exports.drag = drag;

  function drop($dragHandle, dropCssPath, dragEvent) {
    var $dropTarget = (0, _jquery['default'])(dropCssPath);

    if ($dropTarget.length === 0) {
      throw 'There are no drop targets by the given selector: \'' + dropCssPath + '\'';
    }

    _ember['default'].run(function () {
      triggerEvent($dropTarget, 'dragover', _myOwnTestsHelpersDataTransfer['default'].makeMockEvent());
    });

    _ember['default'].run(function () {
      triggerEvent($dropTarget, 'drop', _myOwnTestsHelpersDataTransfer['default'].makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });

    _ember['default'].run(function () {
      triggerEvent($dragHandle, 'dragend', _myOwnTestsHelpersDataTransfer['default'].makeMockEvent());
    });
  }

  function drag(cssPath) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var dragEvent = _myOwnTestsHelpersDataTransfer['default'].makeMockEvent();
    var $dragHandle = (0, _jquery['default'])(cssPath);

    _ember['default'].run(function () {
      triggerEvent($dragHandle, 'mouseover');
    });

    _ember['default'].run(function () {
      triggerEvent($dragHandle, 'dragstart', dragEvent);
    });

    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });

    andThen(function () {
      if (options.drop) {
        drop($dragHandle, options.drop, dragEvent);
      }
    });
  }
});
/* global triggerEvent , andThen */
define('my-own/tests/helpers/mock-event', ['exports'], function (exports) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  exports.createDomEvent = createDomEvent;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var DataTransfer = (function () {
    function DataTransfer() {
      _classCallCheck(this, DataTransfer);

      this.data = {};
    }

    _createClass(DataTransfer, [{
      key: 'setData',
      value: function setData(type, value) {
        this.data[type] = value;
        return this;
      }
    }, {
      key: 'getData',
      value: function getData() {
        var type = arguments.length <= 0 || arguments[0] === undefined ? "Text" : arguments[0];

        return this.data[type];
      }
    }, {
      key: 'setDragImage',
      value: function setDragImage() {}
    }]);

    return DataTransfer;
  })();

  var MockEvent = (function () {
    function MockEvent() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, MockEvent);

      this.dataTransfer = new DataTransfer();
      this.dataTransfer.setData('Text', options.dataTransferData);
      this.originalEvent = this;
      this.setProperties(options);
    }

    _createClass(MockEvent, [{
      key: 'useDataTransferData',
      value: function useDataTransferData(otherEvent) {
        this.dataTransfer.setData('Text', otherEvent.dataTransfer.getData());
        return this;
      }
    }, {
      key: 'setProperties',
      value: function setProperties(props) {
        for (var prop in props) {
          this[prop] = props[prop];
        }
        return this;
      }
    }, {
      key: 'preventDefault',
      value: function preventDefault() {}
    }, {
      key: 'stopPropagation',
      value: function stopPropagation() {}
    }]);

    return MockEvent;
  })();

  exports['default'] = MockEvent;

  function createDomEvent(type) {
    var event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, null);
    event.dataTransfer = new DataTransfer();
    return event;
  }
});
define('my-own/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'my-own/tests/helpers/start-app', 'my-own/tests/helpers/destroy-app'], function (exports, _qunit, _myOwnTestsHelpersStartApp, _myOwnTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _myOwnTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _myOwnTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('my-own/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('my-own/tests/helpers/resolver', ['exports', 'my-own/resolver', 'my-own/config/environment'], function (exports, _myOwnResolver, _myOwnConfigEnvironment) {

  var resolver = _myOwnResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _myOwnConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _myOwnConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('my-own/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('my-own/tests/helpers/start-app', ['exports', 'ember', 'my-own/app', 'my-own/config/environment'], function (exports, _ember, _myOwnApp, _myOwnConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _myOwnConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _myOwnApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('my-own/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('my-own/tests/integration/components/semestr-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('semestr-view', 'Integration | Component | semestr view', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 16
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'semestr-view', ['loc', [null, [1, 0], [1, 16]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.6',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'semestr-view', [], [], 0, null, ['loc', [null, [2, 4], [4, 21]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('my-own/tests/integration/components/semestr-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/semestr-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/semestr-view-test.js should pass jshint.');
  });
});
define('my-own/tests/models/contract.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/contract.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contract.js should pass jshint.');
  });
});
define('my-own/tests/models/education-programm.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/education-programm.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/education-programm.js should pass jshint.');
  });
});
define('my-own/tests/models/semestr.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/semestr.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/semestr.js should pass jshint.\nmodels/semestr.js: line 2, col 8, \'date\' is defined but never used.\n\n1 error');
  });
});
define('my-own/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('my-own/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('my-own/tests/routes/educational-programms.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/educational-programms.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/educational-programms.js should pass jshint.');
  });
});
define('my-own/tests/services/store.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/store.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/store.js should pass jshint.\nservices/store.js: line 2, col 28, Missing semicolon.\nservices/store.js: line 1, col 8, \'Ember\' is defined but never used.\n\n2 errors');
  });
});
define('my-own/tests/test-helper', ['exports', 'my-own/tests/helpers/resolver', 'ember-qunit'], function (exports, _myOwnTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_myOwnTestsHelpersResolver['default']);
});
define('my-own/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('my-own/tests/unit/controllers/educational-programms-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:educational-programms', 'Unit | Controller | educational programms', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('my-own/tests/unit/controllers/educational-programms-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/educational-programms-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/educational-programms-test.js should pass jshint.');
  });
});
define('my-own/tests/unit/models/contract-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('contract', 'Unit | Model | contract', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('my-own/tests/unit/models/contract-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/contract-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contract-test.js should pass jshint.');
  });
});
define('my-own/tests/unit/models/education-programm-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('education-programm', 'Unit | Model | education programm', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('my-own/tests/unit/models/education-programm-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/education-programm-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/education-programm-test.js should pass jshint.');
  });
});
define('my-own/tests/unit/models/semestr-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('semestr', 'Unit | Model | semestr', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('my-own/tests/unit/models/semestr-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/semestr-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/semestr-test.js should pass jshint.');
  });
});
define('my-own/tests/unit/routes/educational-programms-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:educational-programms', 'Unit | Route | educational programms', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('my-own/tests/unit/routes/educational-programms-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/educational-programms-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/educational-programms-test.js should pass jshint.');
  });
});
define('my-own/tests/unit/services/store-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:store', 'Unit | Service | store', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('my-own/tests/unit/services/store-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/store-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/store-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('my-own/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
