
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
