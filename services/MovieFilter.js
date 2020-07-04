import Geocoder from 'react-native-geocoder'
import Geolocation from '@react-native-community/geolocation';


export const getLocation = async () => {
    return new Promise((resolve, reject) => {
        
        const onReceiveLocation = (geolocation) => {
            resolve(geolocation)
        }

        Geolocation.getCurrentPosition(onReceiveLocation, (error) => {
            console.log(error)
            reject()
        })
    })
}

export const filtrarPorCidade = async (filmes, geolocation) => {
    const location = await Geocoder.geocodePosition({
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude
    })

    const nacional = filmes.filter((filme, index) => {
        return filme.Country.toLowerCase().includes(location[0].country.toLowerCase()) ||
            filme.Country.toLowerCase().includes(location[0].countryCode.toLowerCase())
    })

    return nacional
}