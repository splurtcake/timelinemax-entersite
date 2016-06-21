(function($, TimelineMax) {

  var module = {


    props: {
      duration: 1.5,
      window: $(window),
      image: $('.start__img'),
      video: $('.background__video'),

      scene: {
        frames: 48,
        spriteHeight: 6384,
        frameHeight: 133
      },
    },


    init: function() {
      /**
       * @function init
       * Creates Events & Tweens
       */
      this.props.window
      .on('keydown', this.keypress.bind(this))
      .on('keyup', this.toStart.bind(this));

      this.videoTween = new TimelineMax({
        paused: true
      })

      .to(this.props.video, this.props.duration, {
        scale: 1.25,
        ease: Power2.easeOut
      });

      this.barTween = new TimelineMax({
        paused: true
      })

      .to(this.props.image, this.props.duration, {
        y: (this.props.scene.spriteHeight - this.props.scene.frameHeight) / this.props.scene.spriteHeight * -100 + '%',
        ease: SteppedEase.config(this.props.scene.frames - 1)
      })

      .addCallback(this.tweenFinished.bind(this), '-=0.3');
    },


    tweenFinished: function() {
      /**
       * @function tweenFinished
       * Fired when the tween has finished
       */
      console.log('Finished');
      this.props.window.off('keyup');
    },


    toStart: function() {
      /**
       * @function toStart
       * Rewinds the animations back to the start
       */
      this.barTween
      .duration(this.props.duration / 3)
      .reverse();
      
      this.videoTween
      .reverse()
      .timeScale(this.props.duration * 3);
    },


    keypress: function(e) {
      /**
       * @function keypress
       * @param {e} Event
       */
      if (e.keyCode !== 32) return;

      this.barTween
      .duration(this.props.duration)
      .play();

      this.videoTween
      .play()
      .timeScale(1);
    }
  };

  module.init();

}(jQuery, TimelineMax));