jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Game created by Bob!" + "</div>"
 );
});
jQuery("#helpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Press SPACE to switch gravity" +
 "<br>" + "Avoid the skyscrapers" + "</div>"

);
});
