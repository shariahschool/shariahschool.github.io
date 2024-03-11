function fixTriangles(){
    const list = document.getElementsByClassName('triangle');
    console.log(list);
    console.log(list.length);
    for (let i = 0; i < list.length; i++) {
        list[i].style.borderLeftWidth = document.body.clientWidth;;
    }
    const list2 = document.getElementsByClassName('invertedTriangle');
    for (let i = 0; i < list2.length; i++) {
        list2[i].style.borderRightWidth = document.body.clientWidth;;
    }
}

document.addEventListener('DOMContentLoaded', fixTriangles);
document.addEventListener('resize', fixTriangles);
//test