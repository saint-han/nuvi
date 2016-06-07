var myFunc = function(arg) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nuvi-challenge.herokuapp.com/activities";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            display(myArr, arg);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// This function is designed just to display datas/activities
// from three(3) social media platform(Facebook, Twitter, and IG)
function display(arr, arg) {
    var actor_username = "";
    var provider = "";
    var provider_url = "";
    var avatar = "";
    var activity_date = "";
    var activity_shares = "";
    var shares = [];
    var date = [];

    for (var i = 0; i < arr.length; i++) {
        if (arg === arr[i].provider) {
            activity_shares = arr[i].activity_shares;
            shares.push(activity_shares);

            var column = document.createElement('div');
            column.setAttribute('class', "col-xs-6 col-md-3");

            var thumbnail = document.createElement("div");
            thumbnail.setAttribute("class", "thumbnail");
            thumbnail.setAttribute("id", "thumbnail");

            actor_username = arr[i].actor_name;
            var actor_description = arr[i].actor_description;
            provider = arr[i].provider;

            var cardBlock = document.createElement("div");
            cardBlock.className = "caption";
            cardBlock.innerHTML = "<h4 class='card-title' id='actor_username'>" + actor_username + "</h4>";

            var desc = document.createElement('p');
            desc.setAttribute("class", "card-text");
            trunc = actor_description.substring(0, 3);
            desc.innerHTML = actor_description;

            var media = document.createElement('h5');
            media.setAttribute("class", "card-text");
            media.innerHTML = provider;

            cardBlock.appendChild(desc);
            cardBlock.appendChild(media);

            avatar = document.createElement("img");
            avatar.className = "card-img-top";
            avatar.alt = "Card image cap";

            if(arr[i].activity_attachment == null) {
                avatar.src = "../images/avatar.png";
            }
            else {
                avatar.src = arr[i].activity_attachment;
            }

            activity_date = arr[i].activity_date;
            date.push(activity_date);
            var update = document.createElement("p");
            update.setAttribute("class", "card-text");
            update.setAttribute("id", "card-text");
            update.innerHTML = "<small class='text-muted'>" + activity_date + "</small>";

            document.getElementById('row').appendChild(column);
            column.appendChild(thumbnail);
            thumbnail.appendChild(avatar);
            thumbnail.appendChild(cardBlock);
            thumbnail.appendChild(update);
        };
    };

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date.slice(0,6),
            datasets: [{
                label: provider.toUpperCase(),
                data: shares.slice(0,6),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};
