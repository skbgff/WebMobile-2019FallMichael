function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    var url = `https://api.github.com/users/${user}`;
    xhttp.open('GET',url, false);
    xhttp.send();
    return xhttp;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var UserName = user.name;
    var UserID = user.id;
    var ProfilePic = new Image();
    ProfilePic.src = user.avatar_url;
    var Link = 'https://github.com/' + username;
    var userLink = Link.link('https://github.com/' + username);
    document.getElementsByTagName("h2")[0].innerHTML = `${UserName}<br>${UserID}<br>${userLink}`;
    document.getElementsByClassName("avatar")[0].appendChild(ProfilePic);



}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    document.getElementsByTagName("h2")[0].innerHTML="Error! Cannot find user.";

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
