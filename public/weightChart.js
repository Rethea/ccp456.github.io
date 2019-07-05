var weight = []
// weight.push()
weight.push(181.1, 180.2, 178.4)
weight.push(176.4, 177.8)
weight.push(176.4)
function up(num) {
    weight.push(num * 2)
}
// up()
up(88.6)

let date = function (){
    let firstday = new Date(2019,5,28)
    let oneday = 3600 * 24 * 1000
    let daydata = []
    for(let i = 0; i < weight.length; i++) {
        let time = firstday.getTime() + oneday * i
        daydata.push([time, weight[i]])
    }
    console.log(daydata)
    return daydata
}

let change = function (){
    let firstday = new Date(2019,5,28)
    let oneday = 3600 * 24 * 1000
    let changedata = []
    for(let i = 1; i < weight.length; i++) {
        let changetime = firstday.getTime() + oneday * (i - 1)
        changedata.push([changetime, weight[i] - weight[i - 1]])
    }
    console.log(changedata)
    return changedata
}

let myChart = echarts.init(document.getElementById('weight'));
let option = {
    title: {
        text: '不减不是中国人',
        subtext: '目标120',
        top: 'top',
        left: 'center'
    },
    visualMap: {
        show: false,
        min: -2,
        max: 2,
        color: [ '#ef5055', '#f5898b', '#f5d69f', '#b1cfa5', '#308e92','#4a657a']
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0]
            var date = new Date(params.data[0])
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日  : ' + params.value[1] + '斤'
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: [
        {
            name: '体重',
            type: 'value',
            axisLabel: {
                formatter: '{value} 斤'
            },
            splitLine: {show: false},
            max: 185,
            min: value => value.min - 5 - value.min % 5,
            boundaryGap: [0, '100%']
        }, {
            name: '体重变化量',
            type: 'value',
            min: -3,
            max: 3,
            splitLine: {show: false},
        }],
    series: [
        {
            name: '体重',
            type: 'line',
            visualMap: false,
            data: date(),
            color: "#F58080",
            z: 3,
            lineStyle: {
                normal: {
                    width: 5,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: '#FFCAD4' // 0% 处的颜色
                        }, {
                            offset: 0.4,
                            color: '#F58080' // 100% 处的颜色
                        }, {
                            offset: 1,
                            color: '#F58080' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(245,128,128, 0.5)',
                    shadowBlur: 10,
                    shadowOffsetY: 7
                }
            },
            itemStyle: {
                normal: {
                    color: '#F58080',
                    borderWidth: 10,
                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                    borderColor: "#F58080"
                }
            },
            smooth: true
        },{
            name: 'changeShadow',
            type: 'line',
            yAxisIndex: 1,
            data: change(),
            z: 1,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
                normal: {
                    color: 'transparent'
                }  
            },
            areaStyle: {
                normal: {
                    color: '#fff',
                    shadowBlur: 50,
                    shadowColor: '#ccc'
                }
            }
        }, {
            name: 'change',
            type: 'bar',
            z:2,
            data: change(),
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            }
        }],
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'elasticOut',
    animationDelay: function (idx) {
        return idx * 20;
    },
    animationDelayUpdate: function (idx) {
        return idx * 20;
    }
};

myChart.setOption(option)
