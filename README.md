# Protractor Configuration Adaption

After growing my Protractor test scripts to cover numerous basic test cases, I began to have difficulties managing the configuration of specs to run. 
My solution was to setup a .json config file which enabled me to store all spec paths and pass a boolean for testing. 
This repo provides an example of this solution. 

## conf.json

Maintain all specs here. To run them, set spec property value to true. 

## conf.parse.js

Used for parsing conf.json boolean value to spec file path location.

## conf.path.json

Use for storing all spec file paths.

## ptr.conf.js

Use to run Protractor tests. Use `protractor ptr.conf` in cmd or terminal.