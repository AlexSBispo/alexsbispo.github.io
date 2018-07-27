jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Game created by Alex!" + "</div>"
 );
});
jQuery("#helpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Press SPACE to switch gravity" +
 "<br>" + "Red Power-up Puts you in Flappy Bird Mode" +
 "<br>" + "Blue Power-up Puts you back in Gravity Mode" + "</div>"

);
});
