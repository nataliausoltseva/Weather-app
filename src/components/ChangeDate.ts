export default function changeDate(date:string){
    var newDate = new Date(date);
    var month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var day = newDate.getDate();
    if(day <10){
        day = parseInt(`0${day}`);
    }
    
    return `${day} ${month[newDate.getMonth()]} ${newDate.getFullYear()}`;

}