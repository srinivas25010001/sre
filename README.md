## **Project Overview**
This project involves deploying a **Node.js backend**, **React frontend**, and **MySQL database** on a **private Azure Kubernetes Service (AKS)** cluster, and all sensitive data is secured with **Sealed Secrets**. **Nginx** is used as a reverse proxy to route traffic to the frontend and backend services.

## **Directory Structure**
```
/sre
│── k8s-manifests
│   ├── mysql
│   │   ├── mysql-deployment.yaml
│   │   ├── mysql-service.yaml
│   │   ├── mysql-sealed-secret.yaml
│   ├── node-app
│   │   ├── node-deployment.yaml
│   │   ├── node-service.yaml
│   ├── react-app
│   │   ├── react-deployment.yaml
│   │   ├── react-service.yaml
│   ├── nginx
│   │   ├── nginx-deployment.yaml
│   │   ├── nginx-service.yaml
│   ├── flux
│   │   ├── git-repo.yaml
│── terraform
│   ├── main.tf
│── README.md
```

## **Step-by-Step Setup and Deployment Instructions**

### **1️ Set Up the Private AKS Cluster**
Navigate to the Terraform directory and deploy the required Azure resources:
```sh
cd ~/sre/terraform
terraform init
terraform apply -auto-approve
```

### **2️ Connect to the Private AKS Cluster**
Once Terraform creates the AKS cluster, retrieve the cluster credentials:
```sh
az aks get-credentials --resource-group sre-resourcegp --name sre-aks
```
Verify connection:
```sh
kubectl get nodes
```

### **3️ Install FluxCD**
```sh
flux bootstrap github \
  --owner=<your-github-username> \
  --repository=<your-repo-name> \
  --branch=main \
  --path=./clusters/my-cluster \
  --personal
```
Verify Flux installation:
```sh
kubectl get pods -n flux-system
```

### **4️ Create Sealed Secrets**
Install Sealed Secrets controller:
```sh
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/latest/download/controller.yaml
```
Create the MySQL secret and seal it:
```sh
kubectl create secret generic mysql-secret \
  --from-literal=user=root \
  --from-literal=password=YourStrongPassword \
  --namespace=default \
  --dry-run=client -o yaml | kubeseal --format yaml > k8s/mysql/mysql-sealed-secret.yaml
```
Apply the sealed secret:
```sh
kubectl apply -f k8s/mysql/mysql-sealed-secret.yaml
```

### **5️ Deploy MySQL Database**
```sh
kubectl apply -f k8s/mysql/mysql-deployment.yaml
kubectl apply -f k8s/mysql/mysql-service.yaml
```
Check the deployment:
```sh
kubectl get pods
```

### **6️ Deploy Node.js Backend**
```sh
kubectl apply -f k8s/node-app/node-deployment.yaml
kubectl apply -f k8s/node-app/node-service.yaml
```
Check the deployment:
```sh
kubectl get pods
```

### **7️ Deploy React Frontend**
```sh
kubectl apply -f k8s/react-app/react-deployment.yaml
kubectl apply -f k8s/react-app/react-service.yaml
```
Check the deployment:
```sh
kubectl get pods
```

### **8️ Deploy Nginx Reverse Proxy**
```sh
kubectl apply -f k8s/nginx/nginx-deployment.yaml
kubectl apply -f k8s/nginx/nginx-service.yaml
```
Verify the running services:
```sh
kubectl get svc
```

### **9 Verify Deployment**
Ensure all pods, services, and Ingress (if applicable) are running:
```sh
kubectl get all
```
---

## **Architecture diagram**
![Architecture](https://github.com/user-attachments/assets/8540d3ac-a4cc-4c4f-9525-8e596b4df621)

---

## **Testing and Validation Instructions**

### **1️ Verify MySQL Connection**
```sh
kubectl exec -it <mysql-pod-name> -- mysql -u root -p
```
Check if the database is created:
```sql
SHOW DATABASES;
```

### **2️ Verify Node.js API**
```sh
kubectl get svc
```
Find the **Node.js service** external/internal IP and test with:
```sh
curl http://<NODE_SERVICE_IP>:<PORT>/health
```

### **3️ Verify React Application**
```sh
kubectl get svc
```
Find the **React service** external/internal IP and test in the browser:
```
http://<REACT_SERVICE_IP>:<PORT>
```

### **4️ Validate Nginx Proxy**
```sh
kubectl get svc
```
Find the **Nginx service** external/internal IP and access it in the browser:
```
http://<NGINX_SERVICE_IP>
```
---
