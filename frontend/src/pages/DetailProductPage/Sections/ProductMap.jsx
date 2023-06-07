import React, { useEffect, useState } from 'react';
const { kakao } = window;
const ProductMap = ({ product }) => {
  const lat = localStorage.getItem('lat');
  const lng = localStorage.getItem('lng');
  const [latlng, setLatlng] = useState({ lat: lat, lng: lng });
  useEffect(() => {
    const geocodeAddress = async () => {
      const geocoder = new kakao.maps.services.Geocoder();

      try {
        const { result, status } = await new Promise((resolve, reject) => {
          geocoder.addressSearch(product.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve({ result, status });
            } else {
              reject(status);
            }
          });
        });
        console.log(latlng);
        console.log(status);
        console.log(result);
        const updatedLatlng = { lat: Number(result[0].y), lng: Number(result[0].x) };
        setLatlng(updatedLatlng);
        localStorage.setItem('lat', Number(result[0].y));
        localStorage.setItem('lng', Number(result[0].x));
        const container = document.getElementById('map');
        const mapPosition = new kakao.maps.LatLng(latlng.lat, latlng.lng);
        const options = {
          center: mapPosition,
          level: 1,
        };

        const map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({
          position: mapPosition,
          text: product.address,
        });
        marker.setMap(map);
        var iwContent = `<div style="padding:40px 30px;">${product.address} ${
            product.addressDetail
          }<br><a href="https://map.kakao.com/link/map/${product.address},${latlng.lat},${
            latlng.lng
          }" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${
            product.address + product.addressDetail
          },${latlng.lat},${latlng.lng}" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwPosition = new kakao.maps.LatLng(latlng.lat, latlng.lng); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
          removable: true,
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });
      } catch (error) {
        console.error(error);
      }
    };

    geocodeAddress();
  }, [product.address, lat]);

  return (
    <div
      id='map'
      style={{
        width: '1000px',
        height: '1000px',
      }}></div>
  );
};

export default ProductMap;
