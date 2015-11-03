# Christmas Face Game

A page I created in 2013 as an online Christmas card for my friends.

The main code should still work. Compiling the `jspp` files into `js` will not work until:

  * We add a `bower.json` file to load m1ke/easy-facebook, m1ke/js-utils and facedetection (unknown bower name)
  * Add the ruby gem `js-preprocessor` to a local gemfile.

Once recompiled the code will not run until:

  * We rewrite the facebook code to use the new `easyFacebook` instead of the older `fbQuickApp`

Still, someone has asked to see the source code so here it is!

## Deployment

Designed to be [deployed using git](https://github.com/M1ke/git-deploy).
