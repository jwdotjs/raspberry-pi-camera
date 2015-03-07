# Raspberry Pi Camera Interval Snapshot for Node.JS

This script can be downloaded on your Raspberry Pi and ran to snap photos
from the Raspberry Pi Camera and upload them to AWS S3 at a set interval

You will need to create a credentials.js file in the root of the folder
that exports an object. The object should have your AWS S3 key, secret, and bucket.

Once that is created you can run 'node index' from command line and the script will start
taking pictures and uploading your photos to S3.

You can also pass a few arguments when running the script. Currently the script supports
width, height, and delay (between images). For example 'delay=10000 width=1024 height=768 node index'

(To install Node.js on Raspberry Pi: http://revryl.com/2014/01/04/nodejs-raspberry-pi/)

## Video Stream

1. To use the live video stream run ./video/install.sh once then run ./video/stream.sh from command
line on your Raspberry Pi.

2. You will need a computer that has VLC and from VLC click File -> Open Network...
From here enter the IP address of your Raspberry PI and the port number. (e.g. 192.168.1.1:8080)

This will stream video to your VLC player at about a 2-3 second delay. There are options to use FFMPEG
to convert the encoding from H.264 to MP4 so that you can display the stream on a web server with a video
tag, but other users have reported this will cause a 20 second delay. I have not tried this solution myself
but will post it in the future so all your options are in one place.

## Motion detection

Here are instructions on how to download and use motion detection with your Raspberry Pi Camera.
I will be modifying pimotion.py shortly for consumption by S3.

```
mkdir pi-motion && cd ./pi-motion

wget https://raw.githubusercontent.com/pageauc/pi-motion-orig/master/source/pimotion.py

sudo chmod u+x pimotion.py
vim pimotion.pi && change directory from "google_drive" to "photos" (or whatever you want)

sudo apt-get install python-dev
sudo apt-get install libjpeg-dev
sudo apt-get install python-pip
sudo pip install Pillow

./pimotion.py
```

(Claude Pageau has a sync.sh script for google drive if you prefer over S3.
It can be found here: https://github.com/pageauc/pi-motion-orig)

## License

MIT