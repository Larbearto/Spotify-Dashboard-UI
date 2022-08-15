/\*

1.  Request User Authentication (Spotify)
    - Build the request URL:
      - GET request ==> /authorize endpoint ==> https://accounts.spotify.com/authorize
    - Query Parameters:
      - client_id: Your client ID (REQUIRED)
      - response_type: code (REQUIRED)
      - redirect_uri: Your redirect URI (REQUIRED) ==> \* The URI to redirect to after the user grants or denies permission. This URI needs to have been entered in the Redirect URI allowlist that you specified when you registered your app. The value of `redirect_uri` must exactly match one of the values you entered when you registered your app, including case.
      - scope: The scopes you need (OPTIONAL) ==> \* A space-separated list of scopes. eg. `user-read-private user-read-email`. If no scopes are specified, authorization will be granted only to access publicly available information: that is , only information normally visible in the Spotify desktop, web, and mobile players.
      - show_dialog: true (OPTIONAL) \* Whether or not to force use to approve the app again if theyve already done so. If (false)(default) , a user who has already approved the application may be automaticall redirected to the URI specified by `redirect_uri`. If (true), the user will not be automatically redirected and will have to approve the app again.  
        Example: GET https://accounts.spotify.com/authorize?client_id=1234567890&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09

Example:

const AUTH_URL =
'https://accounts.spotify.com/authorize?client_id=a4dcf4eb43fa47168497a50cfcee94b9&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-top-read%20user-read-recently-played%20user-follow-read%20user-library-read%20user-follow-modify%20user-read-playback-position%20playlist-read-collaborative%20playlist-read-collaborative'

- Make sure redirect URI is http://localhost:3000

const AUTH_URL =
'https://accounts.spotify.com/authorize?client_id=a4dcf4eb43fa47168497a50cfcee94b9&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-top-read%20user-read-recently-played%20user-follow-read%20user-library-read%20user-follow-modify%20user-read-playback-position%20playlist-read-collaborative%20'

function Login() {
return (

<div className='h-screen bg-black flex flex-col items-center pt-40 space-y-8'>
<Image
        src='https://rb.gy/y9mwtb'
        width={600}
        height={250}
        objectFit='contain'
        animate-pulse='true'
        alt='logo'
        className='animate-pulse'
      />
<Link href={AUTH_URL}>
<a
          className='text-white bg-[#1db954] py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest border border-transparent shadow-md shadow-green-200 transition duration-300 ease-out md:text-base hover:scale-110 hover:bg-[#0db11b]'
          href={AUTH_URL}
        >
Sign In with
</a>
</Link>

- Now there is in the URL that the spotify api returned. "code="

http://localhost:3000/?`code=AQCC8QwVkC2Gawk1DFfHjd-Vjjjs1WmSxptLpZoNq7v-hhYx94BHgWaOK--FTBJ5qhC9TXduerVSsTdcUh65VqgyS-IGYKw0P-MX_L16weN_iuzh-AlxDWNvPj9RqlIGMtaJLedPIajcSQbzdPSajpZuxOGyeChelvNVWlpJoTUf1eTonVaj-FZmE-CHTr6BDc3A-fsx_TjgiQ4kdfcvDccRvEHnxOPWcKSVsdILYqm3bdQRPI8sJAtlmb4JhTioUOdZB5d0gU0KSnKIftdgRIJH4CP1BsoGSKreEnjLzmJ12Ae_46VOf5OBxxeAt5uSJdb3rrHyim4ctZgP5k-tviqglGhUiC_S_6GbreO4Lzo2zQ9hN69fkuVjn3r8iEu8oh-5ew574qwoKm3hgefzMpR72Tm2fXF7ZxIgkdUigGqieiXvWmwZDHL4I8DZt1ZwfKwlyr22JbKBwhdqBZgzfIEe3MXRYmf-47wQtBhoKViYPxBcvqgh7eWzA_dONihTo6oPsp5DtBvzAzDQ4pRGY_dUrG2_3eLo`

LOGIN_URL ='https://accounts.spotify.com/authorize?' + queryParamsString.toString()

const code = req.body.code 2) Now we need to convert this 'code' into a token

const spotifyApi = new SpotifyWebApi({
redirectUri: 'http://localhost:3000',
clientId: 'a4dcf4eb43fa47168497a50cfcee94b9',
clientSecret: '9aebe8595ffd4f918545172d9a2b272c'
})

}

clientId: process.env.SPOTIFY_CLIENT_ID,
clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
spotifyApi.refreshAccessToken().then(
function (data) {
console.log('The access token has been refreshed!')

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token'])

},
function (err) {
console.log('Could not refresh access token', err)
}
)
