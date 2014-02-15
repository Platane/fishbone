require.config({
  baseUrl: '../src/',
  paths: {
    specs : '../tests/specs',
    testUtils : '../tests/utils',
    requirejs: 'bower_components/requirejs/require',
    underscore: 'bower_components/underscore/underscore',
    zepto: 'bower_components/zepto/zepto',
    'jasmine' : 'bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html' : 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
    'jasmine-boot' : '../tests/boot',
    'fishboneUtils' : 'utils',
  },
  shim: {
    'jasmine-html': {
      deps: [ 'jasmine' ],
    },
  }
});

require([ 
  'jasmine-boot' ,

  
  'specs/ObservableSpec',
  'specs/ModelPrimitiveAttrSpec',
  'specs/ModelReferenceAttrSpec',
  
  
  'specs/CollectionSpec',


  ],function( jasmineBoot ){


  for(var i=1;i<arguments.length;i++)
    arguments[i]()

  
  jasmineBoot();

})