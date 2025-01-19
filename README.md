Here’s a detailed, well-structured README documentation for setting up a Node.js backend on an EC2 instance and hosting it with Nginx. This document outlines all the steps you have followed and includes any additional configuration steps needed for a successful deployment.

---

# **Deploying Node.js Backend with Nginx on AWS EC2**

This guide explains how to set up a Node.js backend on an **Ubuntu EC2 instance** and configure it to run in a production environment using **Nginx** as a reverse proxy.

## **Steps for Deployment**

### 1. **Launch an EC2 Instance**

- Log in to your AWS console and launch a new EC2 instance with **Ubuntu** as the operating system.
- During the creation of the instance, make sure to configure the **Security Group** to allow **port 80** (HTTP) and **port 22** (SSH) access.
- After the instance is created, download the **.pem key** to SSH into your instance.

### 2. **SSH into EC2 Instance**

Use the following command to connect to the EC2 instance:

```bash
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
```

Replace `your-key.pem` with the path to your private key and `<your-ec2-public-ip>` with the public IP address of your EC2 instance.

### 3. **Clone the Project and Install Dependencies**

Once logged into your EC2 instance:

- Navigate to the directory where you want to clone the repository.
- Clone your Node.js project (replace the URL with your project’s repository URL):

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

- Install the necessary dependencies:

```bash
npm install
```

### 4. **Install Node.js and NPM**

To ensure that Node.js and npm are installed, follow these commands:

```bash
# Update package index
sudo apt update

# Install Node.js
sudo apt install nodejs

# Install npm (Node Package Manager)
sudo apt install npm

# Verify installation
node -v
npm -v
```

### 5. **Update `package.json`**

You may need to update your `package.json` file. In the `scripts` section, ensure the start command points to your main file (`index.js` or `server.js`):

```json
"scripts": {
  "start": "node index.js"
}
```

You can also replace `index.js` with the name of the file containing your server setup.

### 6. **Install Nginx**

Nginx will serve as a reverse proxy to forward requests to your Node.js server. To install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

After installation, you can verify that Nginx is running by visiting `http://<your-ec2-public-ip>` in your browser, and you should see the Nginx default page.

### 7. **Configure Nginx**

Now configure Nginx to serve your Node.js application.

- Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/login.conf
```

- Add the following Nginx configuration:

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

- Create a symlink to enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/login.conf /etc/nginx/sites-enabled/
```

- Test the Nginx configuration for any errors:

```bash
sudo nginx -t
```

- Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

### 8. **Setup .env Variables**

Environment variables should be stored securely in a `.env` file. To add your environment variables:

1. Create a `.env` file in the root of your project:

```bash
nano .env
```

2. Add your environment variables (e.g., database credentials, API keys):

```bash
PORT=8080
MONGO_CONN=
JWT_SECRET="sec-123"
```



### 9. **Run Node.js App with PM2**

To ensure your Node.js app runs continuously in the background (even after the terminal session ends), use **PM2** (Process Manager for Node.js).

- Install PM2 globally:

```bash
sudo npm install pm2 -g
```

- Start your app with PM2:

```bash
pm2 start index.js  # Replace with your main file name
```

- Set up PM2 to restart your app automatically on system reboot:

```bash
pm2 startup
pm2 save
```

### 10. **Verify the Setup**

- Open your browser and navigate to your EC2 public IP or domain name (`http://<your-ec2-public-ip>`).
- You should be able to see your application running on the server. If the app uses routes, such as `/login`, ensure that they are accessible.
- If your frontend is hosted separately, ensure the backend is properly configured to handle API requests.

---

### **Conclusion**

You have now successfully set up your **Node.js backend** on an **EC2 instance** with **Nginx** as a reverse proxy, making it accessible through HTTP on port 80. PM2 ensures that your Node.js app runs continuously. The environment variables are stored securely in the `.env` file.

Make sure to monitor your app using PM2 and configure your security group and firewalls to ensure the application is secure.

