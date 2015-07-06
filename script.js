$(function() {

  var Results = function(track, album, artist, image, music) {
    this.track = track;
    this.album = album;
    this.artist = artist;
    this.image = image;
    this.music = music;
  }

  Results.all = [];

  // template for search results
  var template = _.template($('#track-template').html());

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // form to input for track
  var $track = $('#track');

  // element
  var $results = $('#results');

  // 
  var $resultsList = $("#track-container");

  Results.prototype.save = function() {
    Results.all.push(this);
  }

  Results.prototype.render = function() {
    var resultsIndex = Results.all.indexOf(this);
    var $results = $(template(this));
    $results.attr("data-index", resultsIndex);
    $resultsList.append($results);
  }


  $spotifySearch.on('submit', function(event){
    event.preventDefault();
    $resultsList.empty();

    $.get (('https://api.spotify.com/v1/search?type=track&q=' + $track.val()), function(info) {
        console.log(info);
        // var trackTitle = info.tracks.items[i].name
        // var trackAlbum = info.tracks.items[i].album.name
        // var trackArtist = info.tracks.items[i].artist[0].name
        // var trackImage = info.tracks.items[i].images[1].url
        // var template = _.template($('#track-template').html());

        for (var i = 0; i < 20; i++) {
          var track = info.tracks.items[i];
          var trackTitle = track.name
          var trackAlbum = track.album.name
          var trackArtist = track.artists[0].name
          var trackImage = track.album.images[1].url
          var trackPreview = track.preview_url
          
          var newResults = new Results(trackTitle, trackAlbum, trackArtist, trackImage, trackPreview);
          newResults.save();
          newResults.render();
        }
    })
  });
});