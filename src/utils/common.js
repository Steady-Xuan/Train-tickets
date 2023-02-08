
export const pySegSort = (arr) => {
    if (!String.prototype.localeCompare) return null
    let letters = 'abcdefghjklmnopqrstwxyz'.toUpperCase().split('')
    let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
    let segs = []
    letters.map((item, i) => {
        let cur = { letter: item, data: [] }
        arr.map((item) => {
            if (item.localeCompare(zh[i]) >= 0 && item.localeCompare(zh[i + 1]) < 0) {
                cur.data.push(item)
            }
        })
        if (cur.data.length) {
            cur.data.sort(function (a, b) {
                return a.localeCompare(b, 'zh')
            })
            segs.push(cur)
        }
    })

    return segs
}

export function getNowFormatDate() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    //初始化时间 
    //Year= day.getYear();//有火狐下2008年显示108的bug 
    Year = day.getFullYear();//ie火狐下都可以 
    Month = day.getMonth() + 1;
    Day = day.getDate();
    //Hour = day.getHours(); 
    // Minute = day.getMinutes(); 
    // Second = day.getSeconds(); 
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    }
    else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    }
    else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
}




