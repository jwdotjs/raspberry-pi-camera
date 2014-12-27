# Raspberry Pi Camera for Node.JS

This script can be downloaded on your Raspberry Pi and ran to snap photos
from the Raspberry Pi Camera and upload them to AWS S3 at a set interval

You will need to create a credentials.js file in the root of the folder
that exports an object. The object should have your AWS S3 key, secret, and bucket.

Once that is created you can run 'node index' from command line and the script will start
taking pictures and uploading your photos to S3.

You can also pass a few arguments when running the script. Currently the script supports
width, height, and delay (between images). For example 'delay=10000 width=1024 height=768 node index'

## License

MIT