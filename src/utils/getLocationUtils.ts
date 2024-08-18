/*
 * Retrieves the current geographical location of the user.
 *
 * Uses the browser's geolocation API to get the user's current latitude and longitude.
 * On success, the latitude and longitude are passed to the `onSuccess` callback.
 * On failure, an appropriate error message is passed to the `onError` callback.
*/

export const getLocation = (
    onSuccess: (latitude: number, longitude: number) => void,
    onError: (error: Error) => void
) => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            onSuccess(latitude, longitude);
        }, (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    onError(new Error('User denied the request for Geolocation'));
                    break;
                case error.POSITION_UNAVAILABLE:
                    onError(new Error('Location information is unavailable'));
                    break;
                case error.TIMEOUT:
                    onError(new Error('Request get user location timed out'));
                    break;
                default:
                    onError(new Error('Error getting current location.'));
                    break;
            }
        },
        {
            enableHighAccuracy: true, // location accuracy
            timeout: 5000, //set timeout of 5 seconds
            maximumAge: 0 //Not use cached location
        }
    )} else {
        onError(new Error('Geolocation is not supported by this browser. Try with different browser.'));
    }
}

/*
 * Determines if the given timestamp falls within the daytime or nighttime based on sunrise and sunset times.
 *
 * Compares the given timestamp (`dt`) with the sunrise and sunset times to classify the period as "Day" or "Night".
 *
*/
export const getDayOrNight = (dt: number, sunrise: number, sunset: number): string => {
    if (dt >= sunrise && dt < sunset) {
        return "Day";
    } else {
        return "Night";
    }
}