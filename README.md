Here's your updated README with the added section at the end:

---

# **🚀 Deploying Node.js Backend with Nginx on AWS EC2**

This guide explains how to set up a Node.js backend on an **Ubuntu EC2 instance** and configure it to run in a production environment using **Nginx** as a reverse proxy.

---

### 📜 **Steps for Deployment**

#### 1. **🔧 Launch an EC2 Instance**

- Go to the **AWS Console** and launch a new EC2 instance with **Ubuntu** as the operating system.
- In the **Security Group**, allow **port 80** (HTTP) and **port 22** (SSH) access.
- After creating the instance, **download the `.pem` key** for SSH access.

#### 2. **🔒 SSH into EC2 Instance**

Use the following command to connect:

```bash
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
```

---

#### 3. **🧑‍💻 Clone the Project and Install Dependencies**

1. Navigate to the desired directory and clone your project:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Install dependencies:

```bash
npm install
```

---

#### 4. **⚙️ Install Node.js and NPM**

1. Update package list and install Node.js & NPM:

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

2. Verify installation:

```bash
node -v
npm -v
```

---

#### 5. **📝 Update `package.json`**

Ensure the `scripts` section in `package.json` has the following:

```json
"scripts": {
  "start": "node index.js"
}
```

Replace `index.js` with your server file if necessary.

---

#### 6. **🌐 Install Nginx**

Install Nginx to serve as a reverse proxy:

```bash
sudo apt update
sudo apt install nginx
```

Check if Nginx is working by visiting `http://<your-ec2-public-ip>`.

---

#### 7. **⚙️ Configure Nginx**

1. Create a new configuration file:

```bash
sudo nano /etc/nginx/sites-available/login.conf
```

2. Add the following configuration:

```nginx
server {
    listen 80;
    server_name <your-ec2-public-ip>;

    location / {
        proxy_pass http://localhost:8080;  # Your Node.js app runs on port 8080
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/login.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

#### 8. **🔒 Set Up .env Variables**

1. Create the `.env` file:

```bash
nano .env
```

2. Add environment variables:

```bash
PORT=8080
MONGO_CONN=
JWT_SECRET="sec-123"
```

---

#### 9. **🔄 Run Node.js App with PM2**

PM2 ensures your app runs continuously:

1. Install PM2 globally:

```bash
sudo npm install pm2 -g
```

2. Start the app with PM2:

```bash
pm2 start index.js  # Replace with your main file name
```

3. Set PM2 to restart the app on reboot:

```bash
pm2 startup
pm2 save
```

---

#### 10. **✅ Verify the Setup**

- Open a browser and visit `http://<your-ec2-public-ip>`. Your app should be up and running.

---

### **Conclusion 🎉**

Your **Node.js backend** is now live on **AWS EC2** with **Nginx** as a reverse proxy. The app runs continuously with **PM2**, and **.env** keeps your environment variables secure. 🚀

---

# **Frontend Vite App Deployment on EC2 🌐**

This section explains how to deploy a **Vite** frontend app on your EC2 instance.

---

### **🔧 Prerequisites**

1. EC2 instance (Ubuntu or other Linux OS)
2. **Node.js** and **npm** installed
3. Git installed
4. **Vite** project (React, Vue, or other)
5. Security Groups configured for **port 5173**

---

### **Step-by-Step Guide 📚**

#### 1. **🛠 Install Node.js and npm**

1. SSH into the EC2 instance:

```bash
ssh -i your-key.pem ubuntu@<your-ec2-ip>
```

2. Install Node.js and npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

3. Verify the installation:

```bash
node -v
npm -v
```

---

#### 2. **🔄 Clone the Vite Project**

1. Install Git (if not already installed):

```bash
sudo apt install git
```

2. Clone your Vite project:

```bash
git clone https://github.com/your-username/your-vite-project.git
cd your-vite-project
```

3. Install dependencies:

```bash
npm install
```

---

#### 3. **🔑 Update Environment Variables**

Create or update the `.env` file for necessary configurations, such as:

```bash
VITE_URL="http://<backend-ec2-ip>/auth"
```

---

#### 4. **🚀 Run Vite Development Server**

Run the app and make it accessible:

```bash
npm run dev -- --host
```

Check the output:

```bash
Local: http://localhost:5173/
Network: http://<public-ec2-ip>:5173/
```

---

#### 5. **🔐 Configure Security Group**

1. In **AWS Console**, navigate to **Security Groups**.
2. Add inbound rule for port 5173 (or your Vite port).

---

#### 6. **🔍 Test External Access**

From your browser:

```bash
http://<public-ec2-ip>:5173/
```

Or using curl:

```bash
curl http://<public-ec2-ip>:5173/
```

---

#### 7. **⏳ Keep the Server Running**

Use **tmux**, **screen**, or **pm2** to keep the server running:

##### **Using tmux**

1. Install tmux:

```bash
sudo apt install tmux
```

2. Start a tmux session:

```bash
tmux new -s frontend
```

3. Run your Vite app inside tmux:

```bash
npm run dev -- --host
```

4. Detach from tmux:

Press `Ctrl + b`, then `d`.

---

### **Conclusion 🏁**

You have successfully set up a **Vite frontend app** on your **EC2 instance** with a **Node.js backend**. Your app is now accessible externally, and PM2 ensures it's always running.

--- 

Enjoy the smooth deployment of your applications on AWS! 😎

---

###  **📣📣📣 Feel Free to Open an Issue or Pull Request 📣📣📣**

If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request! Don't hesitate to reach out if you face any problems during the setup process—I'm happy to help!

---

Let me know if you'd like any more adjustments!
