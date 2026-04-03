📝Todo App (MERN + DevOps)

A full-stack **Todo Application** built using the **MERN stack** and enhanced with modern **DevOps practices** like Docker, Jenkins, and Kubernetes
### 💻 Frontend
* React.js
### 🖥️ Backend
* Node.js
* Express.js
### 🗄️ Database
* MongoDB
### ⚙️ DevOps Tools
* Docker 🐳 (Containerization)
* Jenkins 🔁 (CI/CD Pipeline)
* Kubernetes ☸️ (Container Orchestration)

---

## 📁 Project Structure

Todo-mern-devops/
│
├── client/          # React frontend
├── server/          # Node.js backend
├── Jenkinsfile      # CI/CD pipeline (devops branch)
├── docker/          # Docker configurations
└── k8s/             # Kubernetes manifests

---

## 🐳 Docker Setup

### Build Docker Image

```bash
docker build -t todo-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 todo-frontend
```

---

## 🔁 Jenkins CI/CD Pipeline

* Automatically pulls code from GitHub
* Builds Docker image
* Pushes image to DockerHub

### Pipeline Stages:

* ✔ Workspace Cleanup
* ✔ Git Clone
* ✔ Docker Build
* ✔ Docker Push

---

## ☸️ Kubernetes Deployment

### Apply Deployment

```bash
kubectl apply -f k8s/
```

### Check Pods

```bash
kubectl get pods
```
