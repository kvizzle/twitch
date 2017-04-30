 var j = 0;
 var onlineMarkup = "";
 var offlineMarkup = "";
 var allMarkup = "";
 var users = ["ESL_SC2", "cretetion", "freecodecamp", "OgamingSC2", "habathcx", "RobotCaleb", "noobs2ninjas", "TrumpSC", "medrybw"];

 getjson();

 function getjson() {
   for (i = 0; i < users.length; i++) {

     $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + users[i] + '?callback=?', function(data) {

       })
       .done(function(data) {
         checkClosedAccounts(data);

       })
       .fail(function(data) {
         console.log("error");
       });

   }
 }

 function checkClosedAccounts(account) {
   // if account exists
   if (account.hasOwnProperty("mature") == true) {

     checkOnlineStatus(account.display_name, account.logo, account.followers);
   }
   // account doens't exist
   else {
     alert("account does not exist!")
     users.shift(account);
   }

 }

 function checkOnlineStatus(name, logo, followers) {

   $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {})
     // account online
     .done(function(data) {
       createMarkup(data, name, logo, followers);

     })
     .fail(function(data) {
       console.log("eror boi");
     });

 }

 function createMarkup(data, name, logo, followers) {

   if (data.stream !== null) {

     onlineMarkup += '<a href="https://www.twitch.tv/' + name + '" target="_blank"<div class="row twitchLink"><div class="col-sm-4 col-md-4"><br><img src="' + logo + '" class="img-responsive img-circle center-block logo" alt="logo"><h4>' + data.stream.channel.game + '</h4></div> <div class="col-sm-4 col-md-4 "<br><br><h5>' + name + '</h5></div><div class="col-sm-4 col-md-4"><br><div class="symbol" style="background-color:green;"></div> </div></div></a><hr> ';

     allMarkup += '<a href="https://www.twitch.tv/' + name + '" target="_blank"<div class="row twitchLink"><div class="col-sm-4 col-md-4"><br><img src="' + logo + '" class="img-responsive img-circle center-block logo" alt="logo"><h4>' + data.stream.channel.game + '</h4></div> <div class="col-sm-4 col-md-4"<br><br><h5 class="name">' + name + '</h5></div><div class="col-sm-4 col-md-4"><br><div class="symbol" style="background-color:green;"></div> </div></div></a><hr> ';

   } else if (data.stream == null) {

     offlineMarkup += '<a href="https://www.twitch.tv/' + name + '" target="_blank"<div class="row twitchLink"><div class="col-sm-4 col-md-4"><br><img src="' + logo + '" class="img-responsive img-circle center-block logo" alt="logo"></div> <div class="col-sm-4 col-md-4"<br><br><h5>' + name + '</h5></div><div class="col-sm-4 col-md-4"><br><div class="symbol" style="background-color:red;"></div> </div></div></a><hr> ';

     allMarkup += '<a href="https://www.twitch.tv/' + name + '" target="_blank"<div class="row twitchLink"><div class="col-sm-4 col-md-4"><br><img src="' + logo + '" class="img-responsive img-circle center-block logo" alt="logo"></div> <div class="col-sm-4 col-md-4 "<br><br><h5 class="name">' + name + '</h5></div><div class="col-sm-4 col-md-4"><br><div class="symbol" style="background-color:red;"></div> </div></div></a><hr> ';

   }

   $(".onlineSelect").css("background-color", "rgba(55,55,55,0.9)")
   $(".offlineSelect").css("background-color", "rgba(55, 55, 55, 0.9)")
   $(".allSelect").css("background-color", "rgba(55, 55, 55, 0.8)")
   $(".userInfoWindowOuter").empty().append(allMarkup);
   console.log('hi' + allMarkup);
 }

 $(".onlineSelect").click(function() {
   $(".onlineSelect").css("background-color", "rgba(55,55,55,0.8)")
   $(".offlineSelect").css("background-color", "rgba(55, 55, 55, 0.9)")
   $(".allSelect").css("background-color", "rgba(55, 55, 55, 0.9)")
   $(".userInfoWindowOuter").empty().append(onlineMarkup);
 });

 $(".offlineSelect").click(function() {
   $(".onlineSelect").css("background-color", "rgba(55,55,55,0.9)")
   $(".offlineSelect").css("background-color", "rgba(55, 55, 55, 0.8)")
   $(".allSelect").css("background-color", "rgba(55, 55, 55, 0.9)")
   $(".userInfoWindowOuter").empty().append(offlineMarkup);
 });

 $(".allSelect").click(function() {
   $(".onlineSelect").css("background-color", "rgba(55,55,55,0.9)")
   $(".offlineSelect").css("background-color", "rgba(55, 55, 55, 0.9)")
   $(".allSelect").css("background-color", "rgba(55, 55, 55, 0.8)")
   $(".userInfoWindowOuter").empty().append(allMarkup);

 });

 $(".search").submit(function() {

   var val = $(".val").val();
   if (users.indexOf(val) < 0) {
     users.unshift(val);
     onlineMarkup = "";
     offlineMarkup = "";
     allMarkup = "";

     getjson();

   } else {
     alert("They're here already!")
   }
   return false;
 });

 // can top always be top?
