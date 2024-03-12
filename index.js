const databaseUrl = "https://es02.firstinspires.org/teams/_search?size=10000&from=0&source_content_type=application/json&source={%22query%22:{%22bool%22:{%22must%22:[{%22bool%22:{%22should%22:[{%22match%22:{%22team_type%22:%22FRC%22}}]}},{%22bool%22:{%22should%22:[{%22match%22:{%22fk_program_seasons%22:%22323%22}},{%22match%22:{%22fk_program_seasons%22:%22321%22}},{%22match%22:{%22fk_program_seasons%22:%22325%22}},{%22match%22:{%22fk_program_seasons%22:%22319%22}}]}}]}},%22sort%22:%22team_nickname.raw%22}"

function fixTriangles(){
    const list = document.getElementsByClassName('triangle');
    console.log(list);
    console.log(list.length);
    for (let i = 0; i < list.length; i++) {
        list[i].style.borderLeftWidth = document.body.clientWidth;;
    }
    const list2 = document.getElementsByClassName('inverse-triangle');
    for (let i = 0; i < list2.length; i++) {
        list2[i].style.borderRightWidth = document.body.clientWidth;;
    }
}



document.addEventListener('DOMContentLoaded', fixTriangles);
document.addEventListener('resize', fixTriangles);
//test