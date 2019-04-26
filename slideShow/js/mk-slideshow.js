'use strict';

function slideshow(el, option) {
  let speed = option.speed;
  let isInit = null;
  let move = null;
  let animationTypes = {
    slide: {in: 'slide-in', out: 'slide-out', inReverse: 'slide-in-prev', outReverse: 'slide-out-prev'},
    fade: {in: 'fade-in', out: 'fade-out'},
    zoom: {in: 'zoom-in', out: 'zoom-out'}
  }

  let getIndexOf = function getElementIndex(node) {
    var index = 0;
    while ( node = node.previousElementSibling ) {
        index++;
    }
    return index;
  }

  let getCurrentSlide = function () {
    let activeSlide = el + ' .slides .active';

    return document.querySelector(activeSlide);
  }

  let getNextSlide = function () {
    if(getCurrentSlide().nextElementSibling) {
      return getCurrentSlide().nextElementSibling
    } else {
      return getCurrentSlide().parentElement.firstElementChild
    }
  }

  let getprevSlide = function () {
    if(getCurrentSlide().previousElementSibling) {
      return getCurrentSlide().previousElementSibling
    } else {
      let parent = getCurrentSlide().parentElement;

      return parent.lastElementChild
    }
  }

  let activeTheSlide = function (slideIndex) {
    let current = getCurrentSlide(),
    next = current.parentElement.children[slideIndex];

    let indexOfCurrent = getIndexOf(current),
    indexOfNext = getIndexOf(next);

    if(indexOfCurrent === indexOfNext) {
      return true
    }

    let animeType = null;

    if(option.animation === 'slide') {
    
      if(indexOfCurrent > indexOfNext) {
        animeType = {
          in: animationTypes[option.animation].inReverse,
          out: animationTypes[option.animation].outReverse
        }
      } else {
        animeType = animationTypes[option.animation];
      }
    
    } else {
      animeType = animationTypes[option.animation];
    }

    let active = function () {
      current.classList.add(animeType.out);
      next.classList.add(animeType.in,'active');
      
      setTimeout(function () {
        current.classList.remove(animeType.out);
        current.classList.remove('active');
        next.classList.remove(animeType.in);
      },400);

      setActiveIndicatore(next)
    }
    
    if(move) {
      stop();

      move = setTimeout(function () {
        active()

        move = setInterval(function() {
          cycleToNextSlide()
        }, speed)
      }, 400)
    } else {
      active()
    }
  }

  let cycleToNextSlide = function () {
    let cycleMove = function () {
      let current = getCurrentSlide(),
      next = getNextSlide(),
      animeType = animationTypes[option.animation];

      
      current.classList.add(animeType.out);
      next.classList.add(animeType.in ,'active');
      
      setTimeout(function () {
        current.classList.remove(animeType.out);
        current.classList.remove('active');
        next.classList.remove(animeType.in);
      },400);

      setActiveIndicatore(next)
    }

    if(move) {
      stop();

      move = setTimeout(function () {
        cycleMove()

        move = setInterval(function() {
          cycleMove()
        }, speed)
      }, 100)
    } else {
      cycleMove()
    }
  }
  
  let cycleToprevSlide = function () {
    let cycleMove = function () {
      let current = getCurrentSlide(),
      prev = getprevSlide(),
      animeType = {in: null, out: null};

      if(option.animation === 'slide') {
        animeType.in =  animationTypes[option.animation].inReverse;
        animeType.out =  animationTypes[option.animation].outReverse
      } else {
        animeType = animationTypes[option.animation]
      }

      current.classList.add(animeType.out);
      prev.classList.add(animeType.in,'active');
      
      setTimeout(function () {
        current.classList.remove(animeType.out);
        current.classList.remove('active');
        prev.classList.remove(animeType.in);
      },400);

      setActiveIndicatore(prev)
    }
    if(move) {
      stop();

      move = setTimeout(function () {
        cycleMove()

        move = setInterval(function() {
          cycleToNextSlide()
        }, speed)
      }, 100)
    } else {
      cycleMove()
    }
  }

  let play = function () {
    return move = setInterval(function() {
      cycleToNextSlide()
    }, speed)
  }

  let stop = function () {
    clearInterval(move)
    clearTimeout(move)
  }


  let CreateControals = function () {

    let controals = document.createElement('div');
    controals.classList.add('controals');

    let next = document.createElement('div');
    next.classList.add('next');

    next.addEventListener('click', function () {
      cycleToNextSlide()
    });
    controals.appendChild(next);

    let prev = document.createElement('div');
    prev.classList.add('prev');
    
    prev.addEventListener('click', function () {
      cycleToprevSlide()
    });
    controals.appendChild(prev);

    getCurrentSlide().parentElement.parentElement.appendChild(controals)
  }

  let CreateIndicators = function () {
    let slides = getCurrentSlide().parentElement.children;

    let indicators = document.createElement('div');
    indicators.classList.add('indicators');

    for (let i = 0; i <= slides.length -1; i++) {
      let dot = document.createElement('i');
          dot.classList.add('dot');

      if(i === 0){
        dot.classList.add('active');
      }

      dot.addEventListener('click', function () {
        activeTheSlide(i);
      });

      indicators.appendChild(dot)
    }

    getCurrentSlide().parentElement.parentElement.appendChild(indicators)
  }

  let setActiveIndicatore = function(element) {
    let i = getIndexOf(element),
    activeDot = el + ' .indicators i.active';

    let currentActiveDot = document.querySelector(activeDot);
    let dots = currentActiveDot.parentElement.children;

    currentActiveDot.classList.remove('active');
    dots[i].classList.add('active');
  }


    
  

  this.nextSlide = function () {
    cycleToNextSlide()
  }

  this.prevSlide = function () {
    cycleToprevSlide()
  }
  
  this.startSliding = function () {
    play()
  }

  this.stopSliding = function () {
    stop()
  }

  this.init = function (auto = option.autoPlay) {
    if(!isInit){
      isInit = true;

      CreateIndicators();
      CreateControals();

      if(auto) this.startSliding();
    }
  }
}