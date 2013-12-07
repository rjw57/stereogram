/* jshint strict: true */

onmessage = function(event) {
  'use strict';

  render(event.data, function(data) {
    postMessage({ tag: event.data.tag, imageData: data });
  });
};

var render = function(opt, done) {
  'use strict';
  require(['lib/stereogram-engine'], function(engine) {
    engine.renderIntoImageData(opt.depthData, opt.textureData, opt.destData, opt.maxDepthOffset);
    done(opt.destData);
  });
};
