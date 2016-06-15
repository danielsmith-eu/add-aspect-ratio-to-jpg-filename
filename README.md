# add-ratio.js

Looks at a set of JPG files and renames them to add their aspect ratio to their filename.

Useful if you are uploading them to a photo printing website and have a mix of 6:4 and 7:5 photos (for example).

Also notices 1:1 and 4:3 photos, and will error out if it finds these (because I'm making a mistake when I try to print with these aspect ratios).

# Set up

Uses imagemagick, install using the package.json npm:

    npm install

# Usage

Pass filenames as parameters, i.e.:

    node add-radio.js [filename] [filename] [filename]


