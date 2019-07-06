# pip install requests_oauthlib

from requests_oauthlib import OAuth1Session
from urllib.parse import parse_qsl

# consumer_key = ""
# consumer_secret = ""

twitter = OAuth1Session(consumer_key, consumer_secret)

request_token_url = "https://api.twitter.com/oauth/request_token"

response = twitter.post(
    request_token_url
    # params={"oauth_callback": oauth_callback}
)

request_token = dict(parse_qsl(response.content.decode("utf-8")))
print(request_token)

authenticate_url = "https://api.twitter.com/oauth/authenticate?oauth_token"
print(authenticate_url + request_token["oauth_token"])
