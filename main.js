chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('main.html', {
    'width': 1024,
    'height': 768
  });
});
