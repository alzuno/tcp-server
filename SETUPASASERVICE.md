Clone the repo from github: `sudo git clone https://github.com/alzuno/tcp-server.git`

Run `sudo chmod +x tcp-server.js` on the

Make a `tcp-server.service` file:
sudo nano /etc/systemd/system/tcp-server.service
---

[Unit]
Description=TCP Server
After=network.target

[Service]
ExecStart=/opt/bitnami/nodejs/bin/node /opt/bitnami/apps/tcp-server/tcp-server.js
WorkingDirectory=/opt/bitnami/apps/tcp-server/
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=tcpserver
Environment=NODE_ENV=production PORT=1337

[Install]
WantedBy=multi-user.target

---
Copy your service file into the `/etc/systemd/system`

Run `sudo systemctl daemon-reload`

Start it with `sudo systemctl start tcp-server`

Enable it to run on boot with `sudo systemctl enable tcp-server`

Reboot it with: `systemctl restart tcp-server`

See logs with `sudo journalctl -u tcp-server` or see console logs with `sudo journalctl --follow -u tcp-server`
