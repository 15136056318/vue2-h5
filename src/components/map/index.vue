<!--
 * @Description: 
 * @Author: LiuYan
 * @Date: 2022-04-27 15:41:52
 * @LastEditTime: 2022-04-27 15:44:40
 * @LastEditors: LiuYan
 * @Reference: 
-->
<template>
  <div class="a-map">
    <div id="container" style="width: 100vw; height: 100vh" />
  </div>
</template>

<script>
const defaultMapConfig = {
  zoom: 16, // 级别
  center: [120.209741, 30.246767], // 中心点坐标，杭州萧山分局[120.272037, 30.13913]
  viewMode: '2D', // 使用3D视图 要和pitch:75（地图俯仰角度，有效范围 0 度- 83 度）配合使用
  // pitch: 55,
  // mapStyle: 'amap://styles/e1524ca2d6b1244f44e97b21d04d60bc', // 设置地图的显示样式
}
export default {
  data() {
    return {
      map: null,
      mapConfig: { ...defaultMapConfig },
      extData: '',
    }
  },
  mounted() {
    this.readerMap()
  },
  methods: {
    readerMap() {
      this.map = new window.AMap.Map('container', this.mapConfig)
      this.mapClick()
      this.addMarker({ lngLat: [120.209741, 30.246767] })
    },
    //地图坐标点
    addMarker({ lngLat, extData, imgSrc, markerKey }) {
      let icon = null
      if (imgSrc) {
        icon = new AMap.Icon({
          size: new AMap.Size(40, 40),
          // imageOffset: new AMap.Pixel(-10, -10),
          image: imgSrc || '',
          imageSize: new AMap.Size(40, 40),
        })
      }
      let marker = new AMap.Marker({
        position: new AMap.LngLat(lngLat[0], lngLat[1]),
        icon,
        extData,
      })
      marker.on(
        'click',
        function (evt) {
          this.extData = evt.target.getExtData()
          this.addInfoWindow(marker.getPosition())
        }.bind(this)
      )
      if (this[markerKey]) {
        this[markerKey].push(marker)
      }
      this.map.add(marker)
    },
    // 信息框
    addInfoWindow(position) {
      let content = this.createInfoWindow()
      this.map.clearInfoWindow()
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: content,
        offset: new AMap.Pixel(0, -30),
      })
      this.infoWindow.open(this.map, position)
    },
    getCurrentLocation() {
      AMap.plugin(
        'AMap.Geolocation',
        function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            position: 'RB', //定位按钮的停靠位置
            offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          })
          // this.map.addControl(geolocation)
          geolocation.getCurrentPosition(
            function (status, result) {
              if (status == 'complete') {
                if (this.markerList.length > 0) {
                  this.markerList.forEach(item => {
                    this.map.remove(item)
                  })
                }
                this.map.setCenter(result.position)
                const position = result.position.toString().split(',')
                this.addMarker({
                  lngLat: [position[0], position[1]],
                  extData: false,
                  markerKey: 'markerList',
                })
              } else {
                this.$toast('定位失败')
              }
            }.bind(this)
          )
        }.bind(this)
      )
    },
    //自定义窗口样式
    createInfoWindow() {
      const win = document.createElement('div')
      win.className = 'test'
      win.innerHTML = '测试'
      return win
    },
    mapClick() {
      this.map.on(
        'click',
        function (ev) {
          // 清楚所有信息框
          this.map.clearInfoWindow()
          // 触发事件的对象
          var target = ev.target
          // 触发事件的地理坐标，AMap.LngLat 类型
          var lnglat = ev.lnglat
          // 触发事件的像素坐标，AMap.Pixel 类型
          var pixel = ev.pixel
          // 触发事件类型
          var type = ev.type
        }.bind(this)
      )
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .test {
  background: url('../../assets/logo.png') no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  color: #fff;
}
/deep/.amap-logo,
/deep/ .amap-copyright {
  display: none !important;
  img {
    display: none !important;
  }
}
.a-map {
}
</style>
