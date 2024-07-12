import {app, BrowserWindow} from 'electron';

app.whenReady().then(() => {
  console.log('url', process.env.VITE_DEV_SERVER_URL);
  new BrowserWindow().loadURL(process.env.VITE_DEV_SERVER_URL!);
});
