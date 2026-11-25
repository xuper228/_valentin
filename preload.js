const { contextBridge } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

contextBridge.exposeInMainWorld('photoValentin', {
  getPhotos() {
    const photosDirectory = path.join(__dirname, 'photos');

    try {
      return fs.readdirSync(photosDirectory)
        .filter((fileName) => allowedExtensions.has(path.extname(fileName).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((fileName) => pathToFileURL(path.join(photosDirectory, fileName)).href);
    } catch {
      return [];
    }
  }
});

