const path = require('path');
const execa = require('execa');
const fetch = require('node-fetch');
const { readFile, writeFile } = require('fs.promised');
const getWritableDirectory = require('@now/build-utils/fs/get-writable-directory.js');

const CHOOSENIM_URL = "https://nim-lang.org/choosenim/init.sh"
const CURL_ARGS = "-sSf | sh"

exports.analyze = function({ files, entrypoint }) {
  return files[entrypoint].digest;
}

exports.build = async ({ files, entrypoint }) {
  console.log('downloading files...');
  const srcDir = getWritableDirectory();

  try {
    await execa("curl", [CHOOSENIM_URL, CURL_ARGS], { stdio: inherit });
  } catch (err) {
    console.log("Could not install choosenim");
    throw err;
  }

  try {
    await execa("choosenim", ["stable"], { stdio: inherit });
  } catch (err) {
    console.log("Could not install stable version of nim");
    throw err;
  }
}
