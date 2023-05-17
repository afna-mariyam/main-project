import React, {Component} from 'react';

class GeoLocation extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
      })
    }
  }
}

export default GeoLocation;