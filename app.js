// Resources

let videos = [
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_BATCH_2_GIF_22.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_WOOOHOOO_BEACH_01_BOOMERANG.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BATCH_3_GIF_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_CITY_CINEMAGRAPH_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_CINEMAGRAPH_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_GIF_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_WOOOHOOO_BEACH_02_BOOMERANG.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BATCH_2_GIF_13.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_2.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BOOMERANG_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_GIF_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_6.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_BATCH_2_GIF_10_trpzVKP.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  }
];





// init the video

let currVid;
let video = document.getElementById("bg-video");

loadVideo();

$(".heading h1").text(currVid.title);

// creating paperjs objects to create bottom buttons hover effects

let canvas = $("#another-border");
paper.setup(canvas);
let rectBig = new paper.Rectangle(0, 0, 250, 50);
let rectSmall = new paper.Rectangle(0, 0, 150, 50);
let cornerSize = new paper.Size(30, 30);
let roundRectBig = new paper.Path.RoundRectangle(rectBig, cornerSize);
let roundRectSmall = new paper.Path.RoundRectangle(rectSmall, cornerSize);

// Drawing the first bottom buttons

$(".show-button .border path").attr("d", roundRectBig.pathData);

$(".confirm-button .border path").attr("d", roundRectSmall.pathData);

// a listener to create a video transition effect

video.addEventListener('loadeddata', function() {
  anime({
    targets: video,
    opacity: 1,
    scale: [5, 1],
    easing: 'easeInOutQuart'
  });
  anime({
    targets: ".transition",
    opacity: 0,
  });
  setTimeout(function() {
    anime({
      targets: '.confirm-button',
      opacity: 1,
      translateX: [500, 0]
    });
    anime({
      targets: '.confirm-button .border path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 800,
      delay: function(el, i) { return i * 250 },
      loop: false
    });
    anime({
      targets: '.heading',
      translateX: [-500, 0],
      opacity: 1,
      elasticity: 400
    })
  }, 2000)
}, false);

// Animations for buttons

$(".expanding-button").mouseenter(function() {
  anime({
    targets: '.expanding-button .border',
    scale: [2, 1]
  })
});

// Listeners for creating hover effects on bottom Buttons

$(".show-button").mousemove(function(event) {
  var shape = new paper.Shape.Ellipse({
    center: [setCenterX(event.offsetX, 197, 50), setCenterY(event.offsetY, 26, 25)],
    radius: [125, 27],
    strokeColor: 'yellow',
    strokeWidth: '3px'
  });
  let ellipse = shape.toPath();
  // TODO fix the jumping bug when hovering a button
  if (event.offsetX > 125) {
    ellipse.removeSegment(2);
  } else {
    ellipse.removeSegment(0);
  }
  // ellipse.smooth();
  let merged = roundRectBig.unite(ellipse);
  // merged.smooth({ type: 'continuous', factor: 0.});
  let mergedPath = merged.pathData;
  $(".show-button .border path").attr("d", mergedPath);
  anime({
    targets: this,
    scale: 1.08
  })
});

$(".confirm-button").mousemove(function(event) {
  var shape = new paper.Shape.Ellipse({
    center: [setCenterX(event.offsetX, 115, 35), setCenterY(event.offsetY, 26, 25)],
    radius: [75, 27],
    strokeColor: 'yellow',
    strokeWidth: '3px'
  });
  let ellipse = shape.toPath();
  if (event.offsetX > 75) {
    ellipse.removeSegment(2);
  } else {
    ellipse.removeSegment(0);
  }
  // ellipse.smooth();
  let merged = roundRectSmall.unite(ellipse);
  // merged.smooth({ type: 'continuous', factor: 0.});
  let mergedPath = merged.pathData;
  $(".confirm-button .border path").attr("d", mergedPath);
  anime({
    targets: this,
    scale: 1.08
  })
});

$(".confirm-button").mouseout(function (e) {
  $(".confirm-button .border path").attr("d", roundRectSmall.pathData);
  anime({
    targets: this,
    scale: 1
  })
});

$(".show-button").mouseout(function (e) {
  $(".show-button .border path").attr("d", roundRectBig.pathData);
  anime({
    targets: this,
    scale: 1
  })
});

// a function to happen every time a video is loaded

function loadVideo() {
  currVid = videos[random(videos.length)];
  anime({
    targets: video,
    opacity: 0,
    delay: 500
  })
  anime({
    targets: ".transition",
    opacity: 1
  })
  $(".confirm-button").css("opacity", 0);
  $(".heading").css("opacity", 0);
  $("#bg-video source").attr("src", currVid.url);
  video.load();
};


// Helper Functions

function setCenterX(x, maxX, minX) {
  if ( x < maxX && x > minX) {
    return x;
  } else if ( x > maxX ){
    return maxX;
  } else {
    return minX;
  }
};

function setCenterY(y, maxY, minY) {
  if ( y < maxY && y > minY) {
    return y;
  } else if ( y > maxY ){
    return maxY;
  } else {
    return minY;
  }
};

function random(len) {
  return Math.floor(Math.random() * len);
};
