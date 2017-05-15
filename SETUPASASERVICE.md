Follow this steps to install the tcp-server as a service on modern linux systems

- Clone the repo from github: `sudo git clone https://github.com/alzuno/tcp-server.git`
- Run `sudo chmod +x tcp-server.js` on the app folder.
- Make a `tcp-server.service` file on the `/etc/systemd/system/` folder.

You can use this example for the service file, you should change the `ExecStart` and `WorkingDirectory` to fit your needs.
```
[Unit]
Description=TCP Server
After=network.target

[Service]
ExecStart=/path/to/node /path/to/app/tcp-server/tcp-server.js
WorkingDirectory=/path/to/app/tcp-server/
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=tcpserver
Environment=NODE_ENV=production PORT=1337

[Install]
WantedBy=multi-user.target
```
- Run `sudo systemctl daemon-reload`
- Start the service with `sudo systemctl start tcp-server`
- Enable it to run on boot with `sudo systemctl enable tcp-server`
- Reboot it with: `systemctl restart tcp-server`

- You can see logs with `sudo journalctl -u tcp-server` or see the app console logs with `sudo journalctl --follow -u tcp-server`
