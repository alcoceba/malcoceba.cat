var AnimateModule = (function() {

  var config = {
    active: 0,
    inactive: null,
    items: 0,
    initDelay: 1000,
    cycleDelay: 2750,
    animationDuration: 500,
  };

  function animateElements() {

    config.items = $('.skills span').length;
    setTimeout(function() {
      _animate();
    }, config.initDelay);
  }

  function _animate() {
    _animateBorder();
    _animateTitle();
    _animateSkills();
    _animateSkillsCycle();
  }

  function _incrementCycle() {
    config.active = (config.active % config.items) + 1;
    config.inactive = config.active == 1 ? config.items : config.active - 1;
  }

  function _animateBorder() {
    $('.border').animate({
      width: '100%',
      opacity: 1
    }, config.animationDuration);
  }

  function _animateTitle() {
    $('.title-wrapper').delay(200).animate({
      top: 0,
      opacity: 1
    }, config.animationDuration);
  }

  function _animateSkills() {
    $('.skills span:first-child').delay(500).animate({
      top: 0,
      left: 0,
      opacity: 1
    }, config.animationDuration);
    _incrementCycle();
  }

  function _animateSkillsCycle() {
    if ($('.skills span').length > 1) {

      setInterval(function() {

        _incrementCycle();

        $('.skills span:nth-child(' + config.active + ')')
          .removeAttr('style')
          .animate({
            top: 0,
            left: 0,
            opacity: 1
          }, config.animationDuration);

        $('.skills span:nth-child(' + config.inactive + ')')
          .animate({
            top: 0,
            left: '100%',
            opacity: 0
          }, config.animationDuration);

      }, config.cycleDelay);
    }
  }

  return {
    animateElements: animateElements
  };

})();
